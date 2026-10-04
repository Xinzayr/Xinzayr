# Política de Seguridad

## Versiones Soportadas

| Versión | Soporte |
|---------|---------|
| 0.0.x   | ✅ Activo |

## Reportar una Vulnerabilidad

Si descubres una vulnerabilidad de seguridad, por favor **NO abras un issue público**.

Envía un correo a: **security@xinzayr.xyz** (o usa GitHub Security Advisories de forma privada)

Incluye:
- Descripción del problema
- Pasos para reproducir
- Impacto potencial
- Posible solución (si la tienes)

Responderemos en un máximo de 72 horas.

---

## Medidas de Seguridad Implementadas

### 1. Protección de Secretos
- ✅ Archivo `.env` en `.gitignore`
- ✅ Variables de entorno para todas las credenciales (Spotify, GitHub, Blogger, etc.)
- ✅ Script `security-check.js` que se ejecuta en `prebuild`
- ✅ Detección automática de patrones de tokens (GitHub, Stripe, Google, etc.)
- ✅ No hay secretos hardcodeados en el código fuente

### 2. Prevención de XSS (Cross-Site Scripting)
- ✅ Sanitización de HTML con **DOMPurify** en renderizado de READMEs externos
- ✅ Política de Contenido Seguro (CSP) configurada en `astro.config.mjs`
- ✅ Escape de HTML en componentes interactivos (`escapeHtml`)
- ✅ Atributos `rel="noopener noreferrer"` en enlaces externos

### 3. Prevención de Inyección
- ✅ Consultas GraphQL parametrizadas (variables en lugar de interpolación)
- ✅ Validación y sanitización de entradas de usuario
- ✅ Uso de `encodeURIComponent` para URLs dinámicas

### 4. Cabeceras de Seguridad (HTTP Headers)
Configuradas en `astro.config.mjs`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `Content-Security-Policy` restrictiva

### 5. Cumplimiento GDPR / ePrivacy
- ✅ **Google Consent Mode v2** implementado (estado por defecto: DENEGADO)
- ✅ **Banner de consentimiento de cookies** propio (CookieConsent.astro)
- ✅ Analytics (GA4, Clarity) solo se cargan tras consentimiento explícito
- ✅ No se usan cookies de marketing/publicidad personalizada
- ✅ `localStorage` para almacenar preferencias (no cookies de terceros innecesarias)
- ✅ Enlace a política de privacidad en el footer

### 6. Dependencias
- ✅ `sharp` actualizado a v0.34.5+ (sin vulnerabilidades conocidas)
- ✅ `sanitize-html` / `dompurify` para sanitización
- ✅ Auditoría automática en `prebuild`
- ⚠️ Algunas dependencias transitivas tienen avisos (revisar con `npm audit`)

### 7. API Routes
- ✅ Endpoints de Spotify (`/api/spotify.json`, `/api/spotify-login`, `/api/spotify-callback`) usan variables de entorno
- ✅ No hay credenciales en el código cliente
- ✅ Tokens de actualización (refresh tokens) nunca expuestos al navegador

---

## Checklist de Despliegue Seguro

Antes de hacer deploy a producción:

- [ ] Verificar que `.env` NO está en el repositorio
- [ ] Configurar variables de entorno en la plataforma de hosting (Vercel, Netlify, GitHub Pages + Actions, etc.)
- [ ] Variables requeridas:
  - `GITHUB_TOKEN` (Personal Access Token con scope `repo` y `read:user`)
  - `GITHUB_USERNAME` (tu usuario de GitHub)
  - `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`
  - `DISCORD_USER_ID` (para Lanyard)
  - `PUBLIC_CLARITY_ID` (ID de Microsoft Clarity)
  - `BLOGGER_API_KEY`, `BLOGGER_BLOG_ID` (opcional, para blog)
- [ ] Habilitar HSTS en el hosting (ya configurado en headers)
- [ ] Verificar que CSP no bloquea recursos legítimos (revisar consola del navegador)
- [ ] Probar banner de cookies: aceptar/denegar y verificar que analytics se carga/bloquea correctamente

---

## Contacto

Para dudas de seguridad: **security@xinzayr.xyz**