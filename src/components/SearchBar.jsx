export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Rechercher une tâche par titre…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Rechercher une tâche"
      />
    </div>
  );
}
