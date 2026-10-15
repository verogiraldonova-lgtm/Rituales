# La luz que permanece

*Novena botánica para honrar el amor y abrazar la vida*

Para María Eugenia Nova —Meñita—
En memoria de Alejandro Franco
Medellín · 2026

---

Micrositio ceremonial de nueve encuentros. Es un sitio estático (React + Vite + TypeScript), sin servidor, sin rastreo, sin música automática y sin imágenes externas: las ilustraciones son SVG originales y las tipografías van incluidas en el proyecto.

## Recorrido

| Sección | Enlace directo |
| --- | --- |
| Portada | `#/` |
| Inicio (dedicatoria y «Antes de comenzar») | `#/inicio` |
| Preparación del altar | `#/altar` |
| Oración de apertura | `#/apertura` |
| Invocación de las nueve luces | `#/invocacion` |
| Día I a Día IX | `#/dia/1` … `#/dia/9` |
| Oración de cierre | `#/cierre` |
| Lo que aún florece | `#/florece` |

Ejemplo: `https://<usuario>.github.io/la-luz-que-permanece/#/dia/3`

Todas las jornadas están siempre disponibles. Nada se bloquea por fecha.

## Lo que se guarda en el dispositivo

Solo en el navegador de quien lee (`localStorage`), nunca en un servidor:

- el tamaño de letra elegido,
- las jornadas marcadas como leídas,
- la reflexión escrita en «Lo que aún florece». Puede copiarse o descargarse como `.txt`, y se pierde si se borran los datos del navegador.

## Instalación local

Requiere Node.js 20.19 o superior.

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # verificación de tipos + compilación en dist/
npm run preview   # vista previa de la compilación
```

En desarrollo, abre la dirección que muestra la terminal (por ejemplo `http://localhost:5173/la-luz-que-permanece/`).

## Publicación gratuita en GitHub Pages

El flujo `.github/workflows/deploy.yml` compila y publica el sitio cada vez que se sube un cambio a la rama `main` (también puede ejecutarse a mano desde la pestaña **Actions**).

1. Repositorio: el sitio está pensado para el repositorio `la-luz-que-permanece`. Si el repositorio tiene otro nombre, puedes renombrarlo en **Settings → General → Repository name**. No es imprescindible: el flujo usa automáticamente el nombre real del repositorio como ruta base.
2. En **Settings → Pages**, en *Build and deployment → Source*, elige **GitHub Actions**.
3. Sube los cambios a `main`. Cuando termine el flujo, el sitio estará en
   `https://<usuario>.github.io/la-luz-que-permanece/`.

La ruta base por defecto (`/la-luz-que-permanece/`) está en `vite.config.ts` y puede cambiarse con la variable de entorno `BASE_PATH`.

El sitio incluye `noindex` para que los buscadores no lo indexen. Es un espacio íntimo que se comparte por enlace.

## Estructura

```
src/
  content/
    novena.ts        ← todo el texto del manuscrito (única fuente de contenido)
    types.ts
  pages/             ← portada, preparación, invocación, jornadas, día IX, página final
  components/        ← vela digital, navegación, menú, renderizado de versos y párrafos
  illustrations/     ← romero, manzanilla, orquídea, amatista, luna… en SVG
  state/             ← tamaño de letra, jornadas leídas, vela (y acceso seguro a localStorage)
  styles/            ← tokens de diseño, base y páginas
```

### Editar el texto

Todo el contenido literario está en `src/content/novena.ts`, separado de la presentación. Los párrafos son `p('…')` y las oraciones se escriben como estrofas, una línea por verso. Al guardar, todas las páginas se actualizan.

Los únicos textos que no vienen del manuscrito son las indicaciones de interfaz: «Menú», «Anterior / Siguiente», «Toca la vela para encenderla», «Marcar esta jornada como leída», las etiquetas «Encender la luz / Lectura / Oración / Gesto / Al terminar», «El recorrido» y los avisos sobre el guardado local.

## Accesibilidad

- Lectura pensada primero para el celular: letra de lectura de ~20 px, interlineado amplio y seis tamaños de letra ajustables con A− / A+.
- Contraste AA o superior en todo el texto (el oro decorativo se oscurece cuando se usa en texto).
- Navegación completa con teclado: enlace «Saltar al contenido», menú en un `<dialog>` nativo (se cierra con Escape y devuelve el foco), foco visible y `aria-current` en la página actual.
- Al cambiar de página, el foco va al título para los lectores de pantalla.
- La animación se desactiva si el dispositivo pide movimiento reducido (`prefers-reduced-motion`).
- La vela digital es un acompañamiento simbólico, sin sonido. No sustituye el velón ni los gestos del altar.
