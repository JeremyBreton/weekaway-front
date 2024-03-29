import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function Root() {
  const location = useLocation();

  useEffect(() => {
    // window.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: 'smooth',
    // });
    window.scrollTo(0, 0);
  }, [location.pathname]); // à chaque fois que je change de page

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div className="app">
      <Navbar />
      {/*
        Outlet est le composant qui va « réceptionner »
        l'`element` enfant en fonction de `path`
      */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
