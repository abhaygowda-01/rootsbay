import type { ReactNode } from "react";

/** Opening band for inner pages: breadcrumb slot, one h1, one intro paragraph. */
export function PageHero({
  title,
  children,
  crumbs,
  actions,
}: {
  title: string;
  /** Intro paragraph. Keep it to the answer: what this page is and who it is for. */
  children: ReactNode;
  crumbs?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-sheath-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20">
        {crumbs && <div className="mb-8">{crumbs}</div>}
        <h1 className="max-w-3xl text-4xl leading-[1.06] font-semibold tracking-[-0.025em] text-forest sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{children}</p>
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}
