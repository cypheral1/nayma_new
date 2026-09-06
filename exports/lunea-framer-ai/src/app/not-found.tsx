export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div>
        <h1>404</h1>
        <p>This page could not be found.</p>
        <a href="/">Go home</a>
      </div>
    </main>
  );
}
