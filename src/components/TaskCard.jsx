import { FaEdit, FaTrash, FaUserAlt } from 'react-icons/fa'

function TaskCard({ task, onEdit, onDelete }) {
  return (
    <article className='task-card'>
      <span className='task-card__id'>#{task.id}</span>
      <h3>{task.name}</h3>
      <div className='task-card__meta'>
        <span className={`task-status task-status--${task.status.toLowerCase().replace(/\s+/g, '-')}`}>{task.status}</span>
        <span className='task-assignee'>
          <FaUserAlt />
          {task.assignedTo}
        </span>
      </div>
      <div className='task-card__actions'>
        <button type='button' className='task-button task-button--edit' onClick={() => onEdit(task)}>
          <FaEdit />
          Edit
        </button>
        <button type='button' className='task-button task-button--delete' onClick={() => onDelete(task.id)}>
          <FaTrash />
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskCard