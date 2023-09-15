import './App.css';
import Home from './component/Home';
import Addagent from './component/addAgent.jsx';
import Login from './component/login';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/Addagent' element={<Addagent />}></Route>
        <Route exact path='/login' element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;