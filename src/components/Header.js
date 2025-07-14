export default function Header({ search, setSearch }) {
  return (
    <header style={{ padding: "10px", background: "#eee" }}>
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />
    </header>
  );
}
