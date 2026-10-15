import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Tipografías autoalojadas (sin peticiones a servidores externos).
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource/eb-garamond/latin-400.css'
import '@fontsource/eb-garamond/latin-400-italic.css'
import '@fontsource/eb-garamond/latin-500.css'
import '@fontsource/jost/latin-400.css'
import '@fontsource/jost/latin-500.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/pages.css'

import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
