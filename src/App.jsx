import './style/App.scss'
import {Routes, Route} from "react-router-dom";

import HomePage from "./pages/home/Home.jsx";

function App() {
    return (
      <div className="main">
          <Routes>
              <Route exact path='/' element={<HomePage/>} />
          </Routes>
      </div>
    )
}

export default App
