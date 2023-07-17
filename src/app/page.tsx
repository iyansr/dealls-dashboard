import Header from '@/components/basic/Header';
import Sidebar from '@/components/basic/Sidebar';

export default function Home() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Sidebar />
      <div className="ml-72">
        <Header />
      </div>

      <main className="p-6 mx-auto max-w-screen-2xl ml-72">
        <div className="p-4 bg-white rounded-md">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quasi vero, odit
            impedit fugit architecto blanditiis deserunt officia, sed, laborum omnis ipsam
            laboriosam magnam ipsum temporibus neque quod itaque facere? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Molestias placeat voluptatum fuga soluta, optio,
            voluptatibus nesciunt repellat, provident libero numquam recusandae at? Illum esse
            cumque saepe odio quis laboriosam molestias.
          </p>
        </div>
      </main>
    </div>
  );
}
