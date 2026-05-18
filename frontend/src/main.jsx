import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import FormProvider from './context/FormProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
