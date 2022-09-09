import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useContext } from 'react';
import { AlertContext } from './context/AlertContext';

function App() {
  const alertContext=useContext(AlertContext);
  const {alert}=alertContext;
  return (
    <>
      <Navbar/>
      <Alert alert={alert}/>
      <div className="container">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
