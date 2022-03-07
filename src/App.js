import './App.css';
import Header from './components/Header' ;
import HomePage from './components/HomePage' ;
import {BrowserRouter as Router, Route, Routes} from "react-router-dom" ;
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import DeleteEmployee from './components/DeleteEmployee';

function App() {
  return (
    <Router>
      <div className="container-fluid" style={{padding:"0px"}}>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/add" element={<AddEmployee/>}/>
        <Route exact path="/update/:id" element={<UpdateEmployee/>}/>
        <Route exact path="/delete/:id" element={<DeleteEmployee/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
