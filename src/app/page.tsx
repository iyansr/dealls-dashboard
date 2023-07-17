import { getAllProducts } from '@/api/product';
import Header from '@/components/basic/Header';
import Sidebar from '@/components/basic/Sidebar';
import ProductPage from '@/modules/product/page/ProductPage';

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />
      <div className="ml-72">
        <Header />
      </div>

      <ProductPage products={products.products} />
    </div>
  );
}
