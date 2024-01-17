import type { NextPage } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Profile from '@/components/profile';
import Repository from '@/components/repository';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="custom-screen lg:flex py-8">
        <Profile />
        <Repository />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
