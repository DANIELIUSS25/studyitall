import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-6xl font-bold text-brand-500 mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-[var(--muted-foreground)] mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
        <Link
          href="/curriculum"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--muted)] hover:bg-[var(--border)] rounded-lg font-medium transition-colors"
        >
          Browse Curriculum
        </Link>
      </div>
    </div>
  );
}
