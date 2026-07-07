const STATUTS = [
  { key: 'total', label: 'Total' },
  { key: 'a_faire', label: 'À faire' },
  { key: 'en_cours', label: 'En cours' },
  { key: 'terminee', label: 'Terminées' },
];

export default function StatsBar({ todos }) {
  const counts = {
    total: todos.length,
    a_faire: todos.filter((t) => t.statut === 'a_faire').length,
    en_cours: todos.filter((t) => t.statut === 'en_cours').length,
    terminee: todos.filter((t) => t.statut === 'terminee').length,
  };

  return (
    <section className="stats-bar" aria-label="Statistiques des tâches">
      {STATUTS.map(({ key, label }) => (
        <div key={key} className={`stat-card stat-card--${key}`}>
          <span className="stat-card__number">{counts[key]}</span>
          <span className="stat-card__label">{label}</span>
        </div>
      ))}
    </section>
  );
}
