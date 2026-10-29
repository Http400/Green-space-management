import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import type { Job } from './Map'

export type JobsListProps = {
  jobs: Job[]
  onJobDone: (job: Job) => void
}

function JobsList({ jobs, onJobDone }: JobsListProps) {
  return (
    <>
      <Typography component="h2" variant="h6">
        Jobs
      </Typography>
      <Table size="small" aria-label="Jobs">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.description}</TableCell>
              <TableCell>
                <span
                  className={`job-list__status job-list__status--${job.status}`}
                >
                  {job.status}
                </span>
              </TableCell>
              <TableCell align="right">
                {job.status === 'todo' && (
                  <Button size="small" onClick={() => onJobDone(job)}>
                    Done
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default JobsList
