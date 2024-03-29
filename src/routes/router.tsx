import { createBrowserRouter } from 'react-router-dom';

import Root from './Root/Root';
import App from '../components/App/App';
import SignIn from '../components/Signin/Signin';
import SignUp from '../components/Signup/Signup';
import Error from '../components/Error/Error';
import Landing from '../components/Landing/Landing';
import EventForm from '../components/EventForm/EventForm';
import Presentation from '../components/Presentation/Presentation';
import JoinEventForm from '../components/JoinEventForm/JoinEventForm';
import ProfileSettings from '../components/ProfileSettings/ProfileSettings';
import EventDetails from '../components/EventDetails/EventDetails';
import AboutUs from '../components/AboutUs/AboutUs';
import ContactUs from '../components/ContactUs/ContactUs';
import LegalNotices from '../components/LegalNotices/LegalNotices';

// Router : 1. je crée le router avec `createBrowserRouter`
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      // Pathless Route : permet de diffuser des propriétés
      // à tous les enfants
      {
        // la propriété à diffuser
        // errorElement: <ErrorContent />,
        // à qui ?
        children: [
          {
            // Index Route :
            // le contenu par défaut qui sera affiché dans
            // le composant <Outlet> du parent
            index: true,
            element: <App />,
          },
          {
            path: '/signin',
            element: <SignIn />,
          },
          {
            path: '/signup',
            element: <SignUp />,
          },
          {
            path: '/events',
            element: <Landing />,
          },
          {
            path: '/create',
            element: <EventForm />,
          },
          {
            path: '/join',
            element: <JoinEventForm />,
          },
          {
            path: '/profil',
            element: <ProfileSettings />,
          },
          {
            path: '/event/:idEvent',
            element: <EventDetails />,
          },

          {
            path: '/aboutus',
            element: <AboutUs />,
          },
          {
            path: '/contactus',
            element: <ContactUs />,
          },
          {
            path: '/legalnotices',
            element: <LegalNotices />,
          },
        ],
      },
    ],
  },
]);

export default router;
