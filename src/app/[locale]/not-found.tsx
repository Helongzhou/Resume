import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold">
        Page not found
      </h1>
      <Link
        href="/"
        className="btn-primary mt-8"
      >
        Home
      </Link>
    </div>
  );
}
