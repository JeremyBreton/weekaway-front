import Navbar from '../Navbar/Navbar';
import './App.scss';
import Presentation from '../Presentation/Presentation';
import Advantage from '../Advantage/Advantage';
import Landing from '../Landing/Landing';

function App() {
  return (
    <div style={{ backgroundColor: '#004643' }}>
      <Navbar />
      <Presentation />
      <Advantage />
      <Landing />
    </div>
  );
}

export default App;
