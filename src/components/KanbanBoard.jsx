import KanbanColumn from './KanbanColumn';

const COLONNES = [
  { key: 'a_faire', label: 'À faire' },
  { key: 'en_cours', label: 'En cours' },
  { key: 'terminee', label: 'Terminées' },
];

export default function KanbanBoard({ todos, onEdit, onDelete, onMove }) {
  return (
    <section className="kanban-board">
      {COLONNES.map((colonne) => (
        <KanbanColumn
          key={colonne.key}
          statutKey={colonne.key}
          label={colonne.label}
          todos={todos.filter((t) => t.statut === colonne.key)}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </section>
  );
}
