import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SkeletonTheme } from "react-loading-skeleton";


ReactDOM.createRoot(document.getElementById("root")).render(
  <SkeletonTheme baseColor="#0092E6" highlightColor="#acdef7">
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </SkeletonTheme>
);
