# m7-abp-product-showcase

Una aplicación de catálogo de productos construida con **Vue 3**, diseñada para ofrecer una experiencia de usuario fluida, reactiva y visualmente atractiva.

## Características Principales

- **Catálogo de Productos**: Visualización dinámica de productos consumidos desde una fuente de datos.
- **Gestión de Favoritos**: Los usuarios pueden marcar y gestionar sus productos preferidos.
- **Autenticación con Firebase**: Sistema seguro de registro e inicio de sesión.
- **Tema Dual (Claro/Oscuro)**: Personalización de la interfaz según la preferencia del usuario.
- **Persistencia de Datos**: Integración con Firebase para el almacenamiento y sincronización en tiempo real.

## Stack Tecnológico

- **Frontend**: [Vue.js 3](https://vuejs.org/) (Composition API)
- **UI Framework**: [Vuetify 3](https://vuetifyjs.com/) (Material Design)
- **Gestión de Estado**: [Pinia](https://pinia.vuejs.org/)
- **Enrutamiento**: [Vue Router 4](https://router.vuejs.org/)
- **Herramienta de Construcción**: [Vite](https://vitejs.dev/)
- **Backend-as-a-Service**: [Firebase](https://firebase.google.com/) (Auth, Firestore, Hosting)
- **Testing**: [Vitest](https://vitest.dev/) (Unit) & [Cypress](https://www.cypress.io/) (E2E)
- **Alertas**: [SweetAlert2](https://sweetalert2.github.io/)

## Justificación Técnica

La elección de las tecnologías para este proyecto se basa en los siguientes pilares:

1.  **Vue 3 & Composition API**: Se optó por la Composition API para facilitar la reutilización de lógica y mejorar la legibilidad del código en componentes complejos, aprovechando el sistema de reactividad de última generación de Vue 3.
2.  **Pinia sobre Vuex**: Pinia se seleccionó como el gestor de estado oficial por su simplicidad, soporte nativo para TypeScript y una arquitectura más modular que elimina la necesidad de mutaciones repetitivas, haciendo el flujo de datos más predecible.
3.  **Vite**: Se prefirió Vite por su velocidad de hot-reload casi instantánea y tiempos de compilación significativamente menores, lo que optimiza el flujo de trabajo de desarrollo.
4.  **Vuetify 3**: El uso de Vuetify permite implementar una interfaz profesional siguiendo las directrices de Material Design de Google, garantizando accesibilidad y consistencia visual sin necesidad de escribir CSS extensivo desde cero.
5.  **Arquitectura Modular**: El proyecto sigue una estructura de carpetas basada en capas (Components, Views, Services, Stores) que facilita el mantenimiento y la escalabilidad a largo plazo.

## Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:

### 1. Clonar el repositorio
```bash
git clone https://github.com/maria-moya/m7-abp-product-showcase
cd m7-abp-product-showcase
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Firebase
Crea un archivo `.env` en la raíz del proyecto y añade tus credenciales de Firebase (puedes basarte en el ejemplo del repositorio):
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 4. Ejecutar en modo desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

## Testing

- **Pruebas Unitarias**: Ejecutar con `npm run test:unit` para verificar la lógica de componentes y stores.
- **E2E Testing**: Ejecutar Cypress con `npx cypress open` el comando correspondiente para pruebas de flujo de usuario.

## Despliegue
Este proyecto cuenta con dos opciones de despliegue configuradas:

### Opción A: GitHub Pages
Utiliza el archivo de configuración base y el Router en modo Hash.
```bash
npm run deploy:gh
```

### Opción B: Firebase Hosting
Utiliza la configuración específica en `vite.config.firebase.js` y el historial limpio.
```bash
npm run deploy:firebase
```

