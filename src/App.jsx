import { useCallback, useEffect, useMemo, useState } from "react";
import { todoApi } from "./api/todoApi";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import TodoForm from "./components/TodoForm";
import SearchBar from "./components/SearchBar";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [apiStatus, setApiStatus] = useState("loading");
  const [erreurGlobale, setErreurGlobale] = useState("");
  const [recherche, setRecherche] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const chargerTodos = useCallback(async () => {
    try {
      const data = await todoApi.getAll();
      setTodos(data || []);
      setApiStatus("ok");
      setErreurGlobale("");
    } catch (err) {
      setApiStatus("error");
      setErreurGlobale(
        "Impossible de contacter l'API MediShop. Vérifiez que le backend est démarré sur le port configuré.",
      );
    }
  }, []);

  useEffect(() => {
    chargerTodos();
  }, [chargerTodos]);

  async function handleCreateOrUpdate(champs) {
    setIsSubmitting(true);
    try {
      if (editingTodo) {
        await todoApi.update(editingTodo.id, champs);
        setEditingTodo(null);
      } else {
        await todoApi.create(champs);
      }
      await chargerTodos();
    } catch (err) {
      setErreurGlobale(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(todo) {
    const confirme = window.confirm(
      `Supprimer la tâche « ${todo.titre} » ? Cette action est irréversible.`,
    );
    if (!confirme) return;

    try {
      await todoApi.remove(todo.id);
      if (editingTodo?.id === todo.id) setEditingTodo(null);
      await chargerTodos();
    } catch (err) {
      setErreurGlobale(err.message);
    }
  }

  async function handleMove(todo, nouveauStatut) {
    try {
      await todoApi.update(todo.id, { ...todo, statut: nouveauStatut });
      await chargerTodos();
    } catch (err) {
      setErreurGlobale(err.message);
    }
  }

  function handleEditClick(todo) {
    setEditingTodo(todo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingTodo(null);
  }

  const todosFiltres = useMemo(() => {
    if (!recherche.trim()) return todos;
    const q = recherche.trim().toLowerCase();
    return todos.filter(
      (t) =>
        t.titre.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q),
    );
  }, [todos, recherche]);

  return (
    <div className="app-shell">
      <Header apiStatus={apiStatus} />

      <main className="app-main">
        <StatsBar todos={todos} />

        <div className="panel">
          <h2 className="panel__title">
            {editingTodo ? "Modifier la tâche" : "Ajouter une tâche"}
          </h2>
          <TodoForm
            editingTodo={editingTodo}
            onSubmit={handleCreateOrUpdate}
            onCancel={handleCancelEdit}
            isSubmitting={isSubmitting}
          />
        </div>

        {erreurGlobale && <p className="app-alert">{erreurGlobale}</p>}

        <div className="board-toolbar">
          <h2 className="panel__title">Tableau des tâches</h2>
          <SearchBar value={recherche} onChange={setRecherche} />
        </div>

        <KanbanBoard
          todos={todosFiltres}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          onMove={handleMove}
        />
      </main>

      <footer className="app-footer">MediShop- 221</footer>
    </div>
  );
}
