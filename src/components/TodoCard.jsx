const AUTRES_STATUTS = {
  a_faire: [
    { key: 'en_cours', label: 'Démarrer' },
  ],
  en_cours: [
    { key: 'terminee', label: 'Terminer' },
    { key: 'a_faire', label: 'Remettre en attente' },
  ],
  terminee: [
    { key: 'en_cours', label: 'Réouvrir' },
  ],
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
  });
}

export default function TodoCard({ todo, onEdit, onDelete, onMove }) {
  const idCourt = todo.id.slice(0, 8);

  return (
    <article className="todo-card">
      <div className="todo-card__top">
        <span className="todo-card__id">#{idCourt}</span>
        <span className="todo-card__date">{formatDate(todo.dateMiseAJour)}</span>
      </div>

      <h3 className="todo-card__titre">{todo.titre}</h3>

      {todo.description && <p className="todo-card__description">{todo.description}</p>}

      <div className="todo-card__actions">
        <div className="todo-card__moves">
          {AUTRES_STATUTS[todo.statut].map((cible) => (
            <button
              key={cible.key}
              type="button"
              className="todo-card__move-btn"
              onClick={() => onMove(todo, cible.key)}
            >
              {cible.label} →
            </button>
          ))}
        </div>
        <div className="todo-card__edit-actions">
          <button type="button" className="icon-btn" onClick={() => onEdit(todo)} aria-label="Modifier">
            Modifier
          </button>
          <button
            type="button"
            className="icon-btn icon-btn--danger"
            onClick={() => onDelete(todo)}
            aria-label="Supprimer"
          >
            Supprimer
          </button>
        </div>
      </div>
    </article>
  );
}
