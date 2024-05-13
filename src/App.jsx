import './index.css'
import { Home } from './pages/Home'
import { CreateProject } from './pages/CreateProject';
import { PostDetails } from './pages/PostDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/add" element={<CreateProject />} />
        <Route path="/post/:projectId" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}
