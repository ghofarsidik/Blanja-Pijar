import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
