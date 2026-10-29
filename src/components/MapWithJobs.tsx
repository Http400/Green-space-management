import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import JobsList from './JobsList'
import Map, { type Job, type MapPoint, type NewJob } from './Map'
import './MapWithJobs.css'

export type MapWithJobsProps = {
  jobs: Job[]
  onAddJob: (job: NewJob) => Promise<void> | void
  onJobDone: (job: Job) => void
}

function MapWithJobs({ jobs, onAddJob, onJobDone }: MapWithJobsProps) {
  const [isAddingJob, setIsAddingJob] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [selectedPoints, setSelectedPoints] = useState<MapPoint[]>([])

  function startAddingJob() {
    setDescription('')
    setSelectedPoints([])
    setSubmitError(null)
    setIsAddingJob(true)
  }

  async function submitJob() {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await onAddJob({
        points: selectedPoints,
        description: description.trim(),
        status: 'todo',
      })
      setDescription('')
      setSelectedPoints([])
      setIsAddingJob(false)
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to add job',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="map-with-jobs">
      <div>
        <Map
          jobs={jobs}
          isSelecting={isAddingJob}
          selectedPoints={selectedPoints}
          onSelectedPointsChange={setSelectedPoints}
        />
      </div>
      <aside className="job-list">
        {isAddingJob ? (
          <div className="map-with-jobs__new-job">
            <TextField
              label="Description"
              multiline
              minRows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <div className="map-with-jobs__controls">
              <Button
                disabled={
                  isSubmitting ||
                  selectedPoints.length < 3 ||
                  !description.trim()
                }
                onClick={submitJob}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
              <Button
                disabled={isSubmitting}
                onClick={() => setSelectedPoints([])}
              >
                Reset
              </Button>
            </div>
            {submitError && <p role="alert">{submitError}</p>}
          </div>
        ) : (
          <div className="map-with-jobs__controls">
            <Button onClick={startAddingJob}>Add Job</Button>
          </div>
        )}
        <JobsList jobs={jobs} onJobDone={onJobDone} />
      </aside>
    </div>
  )
}

export default MapWithJobs
