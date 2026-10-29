import { useState } from 'react'
import {
  CircleMarker,
  MapContainer,
  Polygon,
  Popup,
  TileLayer,
  Tooltip,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css'

export type Job = {
  id: number
  points: MapPoint[]
  description: string
  status: 'todo' | 'done'
}

export type NewJob = Omit<Job, 'id'>

export type MapPoint = [latitude: number, longitude: number]

export type MapProps = {
  isSelecting?: boolean
  jobs?: Job[]
  onSelectedPointsChange?: (points: MapPoint[]) => void
  selectedPoints?: MapPoint[]
}

type ClickSelectionProps = {
  isSelecting: boolean
  positions: MapPoint[]
  onSelect: (position: MapPoint) => void
}

function ClickSelection({
  isSelecting,
  positions,
  onSelect,
}: ClickSelectionProps) {
  useMapEvents({
    click(event) {
      if (isSelecting) {
        onSelect([event.latlng.lat, event.latlng.lng])
      }
    },
  })

  return (
    <>
      {positions.map((position, index) => (
        <CircleMarker
          key={`${position[0]}-${position[1]}-${index}`}
          center={position}
          radius={5}
        />
      ))}
      {positions.length >= 3 && <Polygon positions={positions} />}
    </>
  )
}

function Map({
  isSelecting = true,
  jobs = [],
  onSelectedPointsChange,
  selectedPoints,
}: MapProps) {
  const [internalPoints, setInternalPoints] = useState<MapPoint[]>([])
  const points = selectedPoints ?? internalPoints

  function handleSelect(position: MapPoint) {
    const nextPoints = [...points, position]

    if (selectedPoints === undefined) {
      setInternalPoints(nextPoints)
    }
    onSelectedPointsChange?.(nextPoints)
  }

  return (
    <MapContainer
      className="map"
      center={[52.2297, 21.0122]}
      zoom={6}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {jobs.map((job) => (
        <Polygon
          key={job.id}
          positions={job.points}
          pathOptions={{
            color: job.status === 'done' ? '#15803d' : '#d97706',
          }}
        >
          <Tooltip>{job.description}</Tooltip>
          <Popup>
            <strong>{job.description}</strong>
            <br />
            Status: {job.status}
          </Popup>
        </Polygon>
      ))}
      <ClickSelection
        isSelecting={isSelecting}
        positions={points}
        onSelect={handleSelect}
      />
    </MapContainer>
  )
}

export default Map
