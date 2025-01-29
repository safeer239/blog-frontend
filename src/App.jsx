import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

import CreatePost from './Components/CreatePost';
import Post from './Components/Post';
import EditPost from './Components/EditPost';
import Navbar from './Components/Navbar/Navbar';


function App() {
  return (
    <Router>
         <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/edit/:id" element={<EditPost />} /> 
        </Routes>
      </div>

    </Router>
  );
}

export default App;
