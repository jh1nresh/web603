import { useCallback, useEffect, useState } from 'react'
import api from '../api/client'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import StatsBar from '../components/StatsBar'
import FilterButtons from '../components/FilterButtons'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [stats, setStats] = useState({ total: 0, done: 0, active: 0 })
  const [status, setStatus] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // The server does the filtering, so the counts and the list can never drift.
  const load = useCallback(async (nextStatus) => {
    setLoading(true)
    try {
      const { data } = await api.get('/tasks', { params: { status: nextStatus } })
      setTasks(data.tasks)
      setStats(data.stats)
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(status)
  }, [status, load])

  const createTask = async (payload) => {
    await api.post('/tasks', payload)
    await load(status)
  }

  const updateTask = async (id, changes) => {
    await api.put(`/tasks/${id}`, changes)
    await load(status)
  }

  const toggleTask = (task) => updateTask(task.id, { completed: !task.completed })

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`)
    await load(status)
  }

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-4">
        <TaskForm onCreate={createTask} />
      </div>

      <div className="col-12 col-lg-8">
        <div className="card">
          <div className="card-body">
            <StatsBar stats={stats} />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center my-3">
          <h2 className="h5 mb-0">My Tasks</h2>
          <FilterButtons value={status} onChange={setStatus} />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <TaskList
          tasks={tasks}
          loading={loading}
          onToggle={toggleTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  )
}
