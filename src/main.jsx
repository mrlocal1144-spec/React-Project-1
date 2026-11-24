
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { StoreProvider } from './Context/StoreContext'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/grocery">
      <StoreProvider>
        <App/>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
)
