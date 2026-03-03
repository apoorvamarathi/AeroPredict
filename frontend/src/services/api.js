import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000',   // FastAPI backend on port 8000
})

export const predictDelay = (flightData) => API.post('/predict', flightData)
export const fetchMetadata = () => API.get('/metadata')