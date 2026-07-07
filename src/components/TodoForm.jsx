import { useEffect, useState } from 'react';

const CHAMPS_VIDES = { titre: '', description: '', statut: 'a_faire' };

export default function TodoForm({ editingTodo, onSubmit, onCancel, isSubmitting }) {
  const [champs, setChamps] = useState(CHAMPS_VIDES);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setChamps({
        titre: editingTodo.titre,
        description: editingTodo.description || '',
        statut: editingTodo.statut,
      });
    } else {
      setChamps(CHAMPS_VIDES);
    }
    setErreur('');
  }, [editingTodo]);

  function handleChange(e) {
    const { name, value } = e.target;
    setChamps((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!champs.titre.trim()) {
      setErreur('Le titre est obligatoire.');
      return;
    }

    setErreur('');
    await onSubmit(champs);

    if (!editingTodo) {
      setChamps(CHAMPS_VIDES);
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form__row">
        <div className="todo-form__field todo-form__field--grow">
          <label htmlFor="titre">Titre</label>
          <input
            id="titre"
            name="titre"
            type="text"
            placeholder="Ex : Relancer le fournisseur d'emballages"
            value={champs.titre}
            onChange={handleChange}
            maxLength={120}
          />
        </div>
        <div className="todo-form__field">
          <label htmlFor="statut">Statut</label>
          <select id="statut" name="statut" value={champs.statut} onChange={handleChange}>
            <option value="a_faire">À faire</option>
            <option value="en_cours">En cours</option>
            <option value="terminee">Terminée</option>
          </select>
        </div>
      </div>

      <div className="todo-form__field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={2}
          placeholder="Détails, contexte, personne concernée…"
          value={champs.description}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      {erreur && <p className="todo-form__erreur">{erreur}</p>}

      <div className="todo-form__actions">
        {editingTodo && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Annuler
          </button>
        )}
        <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
          {editingTodo ? 'Enregistrer les modifications' : 'Ajouter la tâche'}
        </button>
      </div>
    </form>
  );
}
