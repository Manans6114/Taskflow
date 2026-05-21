import { FaCheck, FaEdit, FaTimes, FaTrash, FaUserAlt } from 'react-icons/fa'
import { STATUS_OPTIONS } from '../utils/constants'

function TaskCard({
  task,
  isEditing,
  editForm,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onEdit,
  onDelete,
}) {
  return (
    <article className={`task-card ${isEditing ? 'task-card--editing' : ''}`}>
      {isEditing ? (
        <form
          className='task-edit-form'
          onSubmit={(event) => {
            event.preventDefault()
            onSaveEdit(task.id)
          }}
        >
          <span className='task-card__id'>#{task.id}</span>

          <label>
            <span>TASK NAME</span>
            <input
              name='name'
              value={editForm.name}
              onChange={onEditChange}
              className='task-edit-input'
            />
          </label>

          <div className='task-edit-grid'>
            <label>
              <span>STATUS</span>
              <select
                name='status'
                value={editForm.status}
                onChange={onEditChange}
                className='task-edit-input'
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label>
              <span>ASSIGNED TO</span>
              <input
                name='assignedTo'
                value={editForm.assignedTo}
                onChange={onEditChange}
                className='task-edit-input'
              />
            </label>
          </div>

          <div className='task-edit-actions'>
            <button type='submit' className='task-button task-button--save'>
              <FaCheck />
              Save
            </button>
            <button type='button' className='task-button task-button--cancel' onClick={onCancelEdit}>
              <FaTimes />
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
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
        </>
      )}
    </article>
  )
}

export default TaskCard