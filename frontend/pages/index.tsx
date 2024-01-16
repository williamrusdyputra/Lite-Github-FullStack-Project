import type { NextPage } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <Footer />
    </div>
  );
};

export default Home;
