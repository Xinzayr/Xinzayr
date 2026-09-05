# 🌌 Xinzayr Portfolio - Liquid Glass Dark Mode

Un portafolio web moderno, altamente receptivo y optimizado con estética **Liquid Glass**, animaciones dinámicas con **tsParticles**, estadísticas en tiempo real de **GitHub**, sincronización de estado de **Discord** y reproductor en vivo de **Spotify**.

---

## 🛠️ Tecnologías Principales

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation & API Routes)
- **UI & Componentes**: [React 19](https://react.dev/), [HeroUI](https://heroui.com/), [Tailwind CSS](https://tailwindcss.com/)
- **Partículas & Efectos**: [tsParticles](https://particles.js.org/)
- **Analítica de Usuario**: [Microsoft Clarity](https://clarity.microsoft.com/)
- **APIs Integradas**: GitHub REST API (Distribución real por Bytes), Lanyard API (Discord Presence), Spotify Web API.

---

## 🚀 Guía de Instalación y Configuración

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/xinzayr/xinzayr-portfolio.git
cd xinzayr-portfolio
npm install
```

### 2. Configurar variables de entorno (`.env`)

Copia el archivo de plantilla `.env.example` a `.env`:

```bash
cp .env.example .env
```

Configura tus llaves y nombres de usuario:

```env
GITHUB_USERNAME=tu_usuario_github
GITHUB_TOKEN=tu_token_de_github

PUBLIC_DISCORD_USER_ID=tu_discord_id
PUBLIC_CLARITY_ID=qx1t86p55p

SPOTIFY_CLIENT_ID=tu_spotify_client_id
SPOTIFY_CLIENT_SECRET=tu_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=tu_spotify_refresh_token
```

---

## 🎵 Configuración de Spotify (Herramienta Automática)

Para sincronizar la música que escuchas en Spotify directamente en tu portafolio, utiliza la herramienta de setup automatizada incluida:

### Paso 1: Configurar Redirect URI en Spotify Developer
1. Entra a tu [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Selecciona o crea tu App.
3. Entra en **Settings** (Configuración) y añade en **Redirect URIs**:
   ```text
   http://127.0.0.1:8889/callback
   ```
4. Guarda los cambios.

### Paso 2: Ejecutar el asistente de Setup
Corre el comando en tu terminal:

```bash
npm run spotify-setup
```

Abre la URL proporcionada en la consola para autorizar tu cuenta. El script obtendrá tu `SPOTIFY_REFRESH_TOKEN` y **actualizará tu archivo `.env` automáticamente**.

---

## 📜 Comandos Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor local de desarrollo (`http://localhost:4321`) |
| `npm run build` | Compila el sitio estático para producción en el directorio `dist/` |
| `npm run preview` | Previsualiza la compilación de producción localmente |
| `npm run spotify-setup` | Asistente interactivo para generar el Refresh Token de Spotify |
| `npm run security-check` | Verifica la seguridad de las variables de entorno |

---

## 🔒 Privacidad y Analítica (Microsoft Clarity)

El portafolio incluye una notificación en la parte inferior sobre el uso de **Microsoft Clarity** para analizar de forma anónima el comportamiento de navegación e interacción. Los usuarios pueden aceptar o cerrar el aviso y la preferencia se guarda localmente en `localStorage`.

---

## 📄 Licencia

Este proyecto está disponible bajo la licencia **MIT**. Puedes usarlo como base para construir tu propio portafolio.
