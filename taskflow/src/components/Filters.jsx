export default function Filters({ filter, setFilter, query, setQuery, activeCount, totalCount }) {
  return (
    <article>
      <header style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <strong>Filters</strong>
        <small>
          Active: {activeCount} · Total: {totalCount}
        </small>
      </header>

      <div className="grid">
        <label>
          Search
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by text…"
          />
        </label>

        <label>
          Status
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="done">Completed</option>
          </select>
        </label>
      </div>
    </article>
  );
}
