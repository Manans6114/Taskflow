function StatusFilter({ value, options, onChange }) {
  return (
    <div className='status-filter' role='tablist' aria-label='Task status filter'>
      {options.map((option) => (
        <button
          key={option}
          type='button'
          className={`status-filter__button ${value === option ? 'status-filter__button--active' : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default StatusFilter