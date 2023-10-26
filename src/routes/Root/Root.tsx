import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

// import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// import Menu from '../../components/Menu/Menu';
// import Loading from './Loading';

// import './Root.scss';
// import { fetchRecipes } from '../../store/reducers/recipes';

function Root() {
  // const loading = useAppSelector((state) => state.recipes.loading);
  // const dispatch = useAppDispatch();

  const location = useLocation();

  // useEffect(() => {
  //   dispatch(fetchRecipes());
  // }, [dispatch]);

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
