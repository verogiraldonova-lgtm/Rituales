import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ruta base para GitHub Pages: https://<usuario>.github.io/Rituales/
// Puede sobrescribirse con la variable de entorno BASE_PATH (el workflow la usa
// para adaptarse automáticamente al nombre real del repositorio).
const base = process.env.BASE_PATH ?? '/Rituales/'

export default defineConfig({
  base,
  plugins: [react()],
})
