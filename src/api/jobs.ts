import type { Job, NewJob } from '../components/Map'

type ApiJob = {
  id: number
  description: string
  location: Job['points']
  status: Uppercase<Job['status']>
}

function toJob(job: ApiJob): Job {
  return {
    id: job.id,
    description: job.description,
    points: job.location,
    status: job.status === 'DONE' ? 'done' : 'todo',
  }
}

export async function fetchJobs(signal?: AbortSignal): Promise<Job[]> {
  const response = await fetch('/api/jobs', {
    method: 'GET',
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs (${response.status})`)
  }

  const apiJobs = (await response.json()) as ApiJob[]

  return apiJobs.map(toJob)
}

export async function addJob(job: NewJob): Promise<Job> {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: job.description,
      status: job.status.toUpperCase(),
      location: job.points,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to add job (${response.status})`)
  }

  return toJob((await response.json()) as ApiJob)
}

export async function updateJobStatus(
  jobId: Job['id'],
  status: Job['status'],
): Promise<Job> {
  const response = await fetch(`/api/jobs/${jobId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: status.toUpperCase(),
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to update job (${response.status})`)
  }

  return toJob((await response.json()) as ApiJob)
}
