import { ProductsNav } from "@/components/ProductsNav";

export default function ProductsLayout({ children }: LayoutProps<"/products">) {
  return (
    <>
      <ProductsNav />
      {children}
    </>
  );
}
