import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Inicio from './components/Inicio';
import Productos from './components/Productos';
import { NotFound } from './components/NotFound';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/productos" element={<Productos/>} />
        <Route path='/notfound' element={<NotFound/>}/>
        <Route path='*' element={<Navigate to='/notfound' replace/>}/>
      </Routes>
    </Router>
  );
}

export default App;
