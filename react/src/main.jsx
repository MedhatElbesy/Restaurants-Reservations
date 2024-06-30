import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee, faCheckSquare } from "@fortawesome/free-solid-svg-icons";

library.add(faCoffee, faCheckSquare);


import { BodyColorProvider } from './BodyColorContext';
import { BranchProvider } from "./components/restaurant/branches/BranchContext.jsx";



ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <BodyColorProvider>
      <BranchProvider>
      <App />
      </BranchProvider>
    </BodyColorProvider>
</React.StrictMode>
)
