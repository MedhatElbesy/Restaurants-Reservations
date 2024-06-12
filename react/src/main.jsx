import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BodyColorProvider } from './BodyColorContext';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BodyColorProvider>
     <App />
     </BodyColorProvider>
  </React.StrictMode>,
)
