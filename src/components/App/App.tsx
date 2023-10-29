import Navbar from '../Navbar/Navbar';
import './App.scss';
import Presentation from '../Presentation/Presentation';
import Advantage from '../Advantage/Advantage';
import Calendar from '../Calendar/Calendar';
import EventForm from '../EventForm/EventForm';

function App() {
  return (
    <div style={{ backgroundColor: '#004643' }}>
      <Navbar />
      <Presentation />
      <Advantage />
    </div>
  );
}

export default App;
