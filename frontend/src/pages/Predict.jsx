import { useState, useEffect } from 'react'
import { predictDelay, fetchMetadata } from '../services/api'
import './Predict.css'

const Predict = () => {
  const [metadata, setMetadata] = useState({ airlines: [], origins: [], destinations: [] })
  const [loadingMeta, setLoadingMeta] = useState(true)
  const [formData, setFormData] = useState({
    airline: '',
    origin: '',
    dest: '',
    date: '',
    dep_time: '',
    distance: ''
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const res = await fetchMetadata()
        setMetadata(res.data)
      } catch (err) {
        console.error('Failed to load metadata', err)
      } finally {
        setLoadingMeta(false)
      }
    }
    loadMetadata()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await predictDelay({
        airline: formData.airline,
        origin: formData.origin,
        dest: formData.dest,
        date: formData.date,
        dep_time: formData.dep_time,
        distance: parseInt(formData.distance)
      })
      setResult(response.data)
    } catch (err) {
      setError('Failed to get prediction. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loadingMeta) {
    return <div className="loading">Loading available options...</div>
  }

  return (
    <div className="predict-page">
      <div className="predict-header">
        <h2>Flight Delay Predictor</h2>
        <p>Fill in your flight details below</p>
      </div>

      <form onSubmit={handleSubmit} className="predict-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Airline</label>
            <select name="airline" value={formData.airline} onChange={handleChange} required>
              <option value="">Select airline</option>
              {metadata.airlines.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Origin</label>
            <select name="origin" value={formData.origin} onChange={handleChange} required>
              <option value="">Select origin</option>
              {metadata.origins.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Destination</label>
            <select name="dest" value={formData.dest} onChange={handleChange} required>
              <option value="">Select destination</option>
              {metadata.destinations.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Departure Time</label>
            <input type="time" name="dep_time" value={formData.dep_time} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Distance (miles)</label>
            <input type="number" name="distance" value={formData.distance} onChange={handleChange} required min="50" max="5000" />
          </div>
        </div>

        <button type="submit" className="predict-btn" disabled={loading}>
          {loading ? 'Predicting...' : '🔮 Predict Delay'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="result-card">
          <h3>Prediction Result</h3>
          <div className={`status-badge ${result.prediction === 1 ? 'delayed' : 'ontime'}`}>
            {result.delay_status}
          </div>
          <div className="result-details">
            <div className="result-metric">
              <span className="metric-label">Delay Probability</span>
              <span className="metric-value">{(result.probability[1] * 100).toFixed(1)}%</span>
            </div>
            <div className="result-metric">
              <span className="metric-label">Confidence</span>
              <span className="metric-value">{result.confidence}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Predict