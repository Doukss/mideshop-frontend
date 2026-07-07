import TodoCard from './TodoCard';

export default function KanbanColumn({ statutKey, label, todos, onEdit, onDelete, onMove }) {
  return (
    <div className={`kanban-column kanban-column--${statutKey}`}>
      <div className="kanban-column__header">
        <span className="kanban-column__label">{label}</span>
        <span className="kanban-column__count">{todos.length}</span>
      </div>

      <div className="kanban-column__body">
        {todos.length === 0 ? (
          <p className="kanban-column__empty">Aucune tâche ici pour l'instant.</p>
        ) : (
          todos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} onEdit={onEdit} onDelete={onDelete} onMove={onMove} />
          ))
        )}
      </div>
    </div>
  );
}
