import Navbar from '../Navbar/Navbar';
import './App.scss';
import Presentation from '../Presentation/Presentation';
import Advantage from '../Advantage/Advantage';
import Reveal from '../Reveal/Reveal';
import Snackbar from '../Snackbar/Snackbar';

function App() {
  return (
    <div style={{ backgroundColor: '#004643' }}>
      <Navbar />
      <Presentation />
      <Advantage />
      <Reveal />
      <Snackbar />
      {/* {body} */}
    </div>
  );
}

export default App;
