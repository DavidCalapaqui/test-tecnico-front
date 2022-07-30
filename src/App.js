
import './App.css';
import {NavBar} from './components/NavBar'
import { CrearPaquete } from './views/CrearPaquete';
function App() {
  return (
    <div className="App">
        <NavBar></NavBar>
        <CrearPaquete></CrearPaquete>
    </div>
  );
}

export default App;
