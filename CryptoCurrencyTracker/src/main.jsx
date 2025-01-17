import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import crypto from './cryptoReducer/crypto.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={crypto} >
    <App />
  </Provider>
)
