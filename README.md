# MediShop - Frontend Todo List (React)

Interface React (Vite) pour la gestion des tâches internes de **MediShop**, sous forme de tableau Kanban (À faire / En cours / Terminées), connectée à l'API backend Express.

## Stack technique

- **React 18** + **Vite**
- CSS natif (aucune dépendance UI externe)
- Communication avec le backend via `fetch`

## Structure du projet

```
mediShop-todo-frontend/
├── index.html
├── src/
│   ├── api/
│   │   └── todoApi.js        # Client HTTP vers l'API backend
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── StatsBar.jsx
│   │   ├── TodoForm.jsx
│   │   ├── SearchBar.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── KanbanColumn.jsx
│   │   └── TodoCard.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
└── vite.config.js
```

## Prérequis

Le backend `mediShop-todo-backend` doit être démarré (par défaut sur `http://localhost:3000`).

## Installation

1. Ouvrir le dossier dans VS Code.
2. Installer les dépendances :

```bash
npm install
```

3. Créer le fichier `.env` (optionnel si le backend tourne bien sur `http://localhost:3000`) :

```bash
cp .env.example .env
```

Le fichier `.env` permet de configurer l'URL de l'API :

```
VITE_API_URL=http://localhost:3000
```

## Démarrage

```bash
npm run dev
```

L'application démarre sur : **http://localhost:5173**

## Fonctionnalités

- Tableau Kanban à 3 colonnes (À faire / En cours / Terminées)
- Statistiques en temps réel (total + par statut)
- Création, modification et suppression de tâches
- Changement rapide de statut directement depuis une carte (« Démarrer », « Terminer », « Réouvrir »…)
- Recherche instantanée par titre ou description
- Indicateur de connexion à l'API dans l'en-tête
- Design responsive (mobile / tablette / desktop)

## Build de production

```bash
npm run build
```

Les fichiers optimisés sont générés dans le dossier `dist/`.

```bash
npm run preview
```

permet de prévisualiser le build de production localement.
