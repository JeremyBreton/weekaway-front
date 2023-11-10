import Navbar from '../Navbar/Navbar';
import './App.scss';
import Presentation from '../Presentation/Presentation';
import Advantage from '../Advantage/Advantage';
import Reveal from '../Reveal/Reveal';
import NotificationBar from '../NotificationBar/NotificationBar';

function App() {
  return (
    <div style={{ backgroundColor: '#004643' }}>
      <Navbar />
      <Presentation />
      <Advantage />
      <Reveal />
      <NotificationBar />
      {/* {body} */}
    </div>
  );
}

export default App;
