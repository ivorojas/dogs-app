import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import DogCreate from "./components/DogCreate";
import Detail from "./components/Detail";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/create" element={<DogCreate />} />
          <Route path="/:id" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;