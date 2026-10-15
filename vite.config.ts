import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ruta base para GitHub Pages: https://<usuario>.github.io/la-luz-que-permanece/
// Puede sobrescribirse con la variable de entorno BASE_PATH (el workflow la usa
// para adaptarse automáticamente al nombre real del repositorio).
const base = process.env.BASE_PATH ?? '/la-luz-que-permanece/'

export default defineConfig({
  base,
  plugins: [react()],
})
