/** Estado controlado cuando el catálogo real no responde. No muestra datos de demostración. */
export default function CatalogUnavailable({ message }: { message: string }) {
  return (
    <main className="catalog-unavailable" role="alert">
      <p className="kicker">Artemis</p>
      <h1 className="h2">Catálogo no disponible</h1>
      <p>{message}</p>
    </main>
  );
}
