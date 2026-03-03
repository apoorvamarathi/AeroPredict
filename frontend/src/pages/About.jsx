import './About.css'

const About = () => {
  return (
    <div className="about">
      <div className="about-card">
        <h2>About This Project</h2>
        <p>
          This Flight Delay Prediction system uses a <strong>Random Forest classifier</strong> trained on historical flight data from the US Bureau of Transportation Statistics. The model predicts whether a flight will be delayed by more than 15 minutes.
        </p>
        <h3>How it works</h3>
        <ul>
          <li>Enter your flight details (airline, origin, destination, date, time, distance).</li>
          <li>The backend estimates arrival time and prepares the feature set.</li>
          <li>A trained ML model (scikit‑learn pipeline) returns a prediction with probability.</li>
        </ul>
        <h3>Tech Stack</h3>
        <ul>
          <li><strong>Frontend:</strong> React 19, React Router, Axios, Vite</li>
          <li><strong>Backend:</strong> FastAPI, scikit‑learn, pandas, joblib</li>
          <li><strong>Deployment:</strong> Ready for Vercel (frontend) & Render (backend)</li>
        </ul>
      </div>
    </div>
  )
}

export default About