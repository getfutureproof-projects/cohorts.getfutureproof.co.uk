import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { CohortProvider } from './contexts/cohort'

ReactDOM.render(
  <Router>
    <CohortProvider>
     <App />
    </CohortProvider>
  </Router>,
  document.getElementById('root')
)