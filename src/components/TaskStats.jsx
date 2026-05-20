const STAT_CONFIG = [
  { key: 'total', label: 'Total Tasks', tone: 'blue' },
  { key: 'inProgress', label: 'In Progress', tone: 'amber' },
  { key: 'completed', label: 'Completed', tone: 'green' },
  { key: 'hold', label: 'On Hold', tone: 'cyan' },
]

function TaskStats({ stats }) {
  return (
    <section className='task-stats'>
      {STAT_CONFIG.map(({ key, label, tone }) => (
        <article key={key} className={`task-stat-card task-stat-card--${tone}`}>
          <strong>{stats[key]}</strong>
          <span>{label}</span>
        </article>
      ))}
    </section>
  )
}

export default TaskStats