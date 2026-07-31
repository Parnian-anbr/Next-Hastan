import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-24 text-center">
      <h1 className="mb-8">Page not found</h1>
      <p className="mb-12">
        Sorry, we couldn&apos;t find what you were looking for.
        <br />
        <Link href="/">Go home</Link>.
      </p>
    </main>
  );
}
