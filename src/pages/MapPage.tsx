import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { addJob, fetchJobs, updateJobStatus } from '../api/jobs'
import type { Job, NewJob } from '../components/Map'
import MapWithJobs from '../components/MapWithJobs'

function MapPage() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const controller = new AbortController()

    async function loadJobs() {
      try {
        setJobs(await fetchJobs(controller.signal))
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
        console.error(error)
      }
    }

    void loadJobs()

    return () => controller.abort()
  }, [])

  async function handleAddJob(job: NewJob) {
    const createdJob = await addJob(job)
    setJobs((currentJobs) => [...currentJobs, createdJob])
  }

  async function handleJobDone(job: Job) {
    try {
      const updatedJob = await updateJobStatus(job.id, 'done')
      setJobs((currentJobs) =>
        currentJobs.map((currentJob) =>
          currentJob.id === updatedJob.id ? updatedJob : currentJob,
        ),
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <AppBar component="header" position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography component="h1" variant="h6">
            Green space management
          </Typography>
        </Toolbar>
      </AppBar>
      <MapWithJobs
        jobs={jobs}
        onAddJob={handleAddJob}
        onJobDone={handleJobDone}
      />
    </>
  )
}

export default MapPage
