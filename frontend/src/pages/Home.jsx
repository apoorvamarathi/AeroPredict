import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Predict Flight Delays with AI</h1>
        <p className="hero-subtitle">
          Use machine learning to forecast delays and plan your travel smarter.
        </p>
        <Link to="/predict" className="cta-button">
          Get Started
        </Link>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Real‑time Prediction</h3>
          <p>Enter your flight details and get instant delay probability.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Accurate Model</h3>
          <p>Trained on millions of historical flights with weather data.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔮</div>
          <h3>Confidence Score</h3>
          <p>See how confident the model is about its prediction.</p>
        </div>
      </div>
    </div>
  )
}

export default Home