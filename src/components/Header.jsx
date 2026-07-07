export default function Header({ apiStatus }) {
  const statusLabel = {
    ok: 'API connectée',
    error: 'API injoignable',
    loading: 'Connexion…',
  }[apiStatus];

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__mark">MS</span>
        <div>
          <h1 className="app-header__title">MediShop</h1>
          <p className="app-header__tagline">Tableau des tâches internes</p>
        </div>
      </div>
      <div className={`app-header__meta app-header__meta--${apiStatus}`}>
        <span className="app-header__dot" />
        {statusLabel}
      </div>
    </header>
  );
}
