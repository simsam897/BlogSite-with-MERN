import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from './store/store.js'
import router from "./app/router.jsx"
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>


import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import { store } from 'store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter >
      <Provider store={store} >
        <App />
      </Provider>
    </BrowserRouter>


  </StrictMode>,
)
