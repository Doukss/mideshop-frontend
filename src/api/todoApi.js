const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const BASE = `${API_URL}/api/todos`;

/**
 * Gère la réponse HTTP : parse le JSON et lève une erreur lisible en cas d'échec.
 */
async function handleResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || `Erreur HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export const todoApi = {
  /**
   * Récupère la liste des tâches, avec filtre optionnel par statut.
   */
  async getAll(statut) {
    const url = statut ? `${BASE}?statut=${encodeURIComponent(statut)}` : BASE;
    const response = await fetch(url);
    return handleResponse(response);
  },

  /**
   * Crée une nouvelle tâche.
   */
  async create(todo) {
    const response = await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    return handleResponse(response);
  },

  /**
   * Met à jour une tâche existante.
   */
  async update(id, todo) {
    const response = await fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    return handleResponse(response);
  },

  /**
   * Supprime une tâche.
   */
  async remove(id) {
    const response = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
    return handleResponse(response);
  },
};
