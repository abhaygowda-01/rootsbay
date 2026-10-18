import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <h1 className="text-4xl font-semibold text-forest">Page not found</h1>
      <p className="mt-4 text-muted">That page doesn&apos;t exist or has moved. The full range is on the products page.</p>
      <Link href="/products" className="mt-8 inline-block rounded-full bg-forest px-6 py-3 font-medium text-white hover:bg-forest-600">
        See all products
      </Link>
    </div>
  );
}
