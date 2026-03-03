import { Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Predict from './pages/Predict'
import About from './pages/About'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>© 2025 Flight Delay Predictor • Powered by ML & React</p>
      </footer>
    </div>
  )
}

export default App