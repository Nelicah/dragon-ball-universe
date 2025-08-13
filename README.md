# 🐉 Dragon Ball Universe

Este proyecto es un ejercicio técnico que implementa una aplicación web interactiva para explorar personajes del universo Dragon Ball.
Permite buscar por nombre y filtrar por nivel de Ki, resolviendo un reto especial:
la API presenta valores de Ki en formatos mixtos (números y strings con magnitudes como "Billion" o "Septillion"), lo que requirió crear un parser robusto capaz de normalizar todos esos formatos para realizar filtrados precisos.

## 📸 Vista previa

**Home**
![Vista previa del proyecto, página principal](/public/dragon-ball1.png)
**Personajes**
![Vista previa del proyecto, página de personajes](/public/dragon-ball2.png)

---

## 🚀 Funcionalidades principales

- Listado completo de personajes obtenido de la API pública [Dragon Ball API](https://web.dragonball-api.com/documentation).
- Búsqueda por nombre con filtrado instantáneo.
- Filtro por rango de Ki que interpreta valores numéricos y textuales, incluso con magnitudes en inglés y formatos europeos.
- Diseño responsive y visualmente atractivo con degradados, iconografía y transiciones suaves.
- Navegación adaptativa con menú de escritorio y versión móvil desplegable.
- Sección de historia para contextualizar el universo.
- Carga optimizada con Lazy loading para mejor rendimiento.

---

## 💡 Retos y soluciones destacadas

1. Normalización de valores de Ki

- La API devuelve datos como 60.000.000, 5 Billion o 19.84 Septillion.
- Se desarrolló una función parseKiString() que:
  - Interpreta magnitudes (Million, Billion, Trillion, Septillion…).
  - Convierte formatos con separadores europeos (60.000.000 → 60000000).
  - Maneja casos especiales como "unknown" o "desconocido".
  - Esto permite filtrar de forma precisa por rangos numéricos.

2. Estructura modular

- Componentes separados para cada sección (Characters, StorySection, HomeSection, Footer).
- Layout organizado con navegación centralizada mediante NavButton.
- Funciones auxiliares para truncar descripciones (summaryUpToLimit) y formatear valores (formatKiForDisplay).

3. Estética visual

- Gradientes que combinan tonos de azul, púrpura y naranja, evocando energía y dinamismo.
- Iconos de lucide-react para reforzar la experiencia visual.
- Animaciones sutiles en botones activos y transiciones suaves.

4. Optimizaciones de Rendimiento

- Lazy Loading: Las imágenes se cargan solo cuando son visibles
- Responsive Design: Grid adaptativo según el tamaño de pantalla

---

## 🛠️ Tecnologías utilizadas

- React — Framework principal para la UI.
- TailwindCSS — Estilizado rápido, responsivo y consistente.
- JavaScript (ES6+) — Lógica de negocio y manipulación de datos.
- lucide-react — Iconografía escalable y moderna.
- Fetch API — Consumo de la API externa de Dragon Ball.

---

## 📜 Licencia

Este proyecto fue desarrollado como ejercicio técnico y no tiene fines comerciales.
Los personajes y nombres pertenecen a Dragon Ball y sus respectivos creadores.

---

## 📬 Contacto

💼 [LinkedIn](www.linkedin.com/in/cande-zamora-125301349)

📧 candezmr2@gmail.com
