
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from './components/Auth/Register/Register';
import Download from "./components/File/Download/Download";
import Home from './components/Home/Home';

function App() {

  
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/download/:id" element={<Download />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
