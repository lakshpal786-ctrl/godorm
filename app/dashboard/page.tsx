export default async function DashboardPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/dashboard`, {
    cache: "no-store"
  });
  const data = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold">Your dashboard</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border bg-white p-4">
          <h2 className="font-semibold">Applications</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {data.applications.map((app: { id: string; property_name: string; status: string }) => (
              <li key={app.id} className="flex justify-between">
                <span>{app.property_name}</span>
                <span>{app.status}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border bg-white p-4">
          <h2 className="font-semibold">Saved properties</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {data.saved.map((saved: { id: string; property_name: string }) => (
              <li key={saved.id}>{saved.property_name}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
