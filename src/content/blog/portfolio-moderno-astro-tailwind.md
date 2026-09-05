---
title: 'Construyendo un Portafolio Moderno con Astro, TailwindCSS y Antigravity AI'
description: 'La historia y arquitectura completa detrás de la evolución de este portafolio: diseño Liquid Glass, integraciones dinámicas de Spotify/Discord, Digital Garden con Obsidian WikiLinks y la colaboración en tiempo real con el Agente Antigravity de Google DeepMind.'
pubDate: '2026-09-05'
updatedDate: '2026-09-05'
heroImage: '../../assets/blog-placeholder-1.jpg'
tags: ['Astro', 'TailwindCSS', 'Antigravity', 'Digital-Garden', 'Spotify-API', 'Portfolio']
category: 'Desarrollo'
author: 'Xinzaýr & Antigravity AI'
readingTime: '6 min lectura'
---

Crear un portafolio personal en la era moderna exige ir más allá de un currículum estático. Debe ser una **experiencia viva, fluida e interactiva** que refleje quién eres, tus proyectos en tiempo real, tu música actual y tu base de conocimientos interconectada.

En este artículo explicamos el proceso completo de arquitectura, diseño y desarrollo de este portafolio, construido mano a mano entre **Xinzaýr** y el **Agente IA Antigravity (Google DeepMind)**.

---

## 🤖 El Modelo de Pair-Programming Agentico con Antigravity

A diferencia de un asistente de código tradicional de autocompletado, **Antigravity** operó como un agente autónomo de pair-programming dentro del espacio de trabajo. Sus capacidades permitieron:

1. **Diseño de Sistemas**: Definir tokens de diseño en CSS Vanilla y Tailwind para el sistema de diseño **Liquid Glass**.
2. **Ejecución de Terminal y Diagnósticos**: Diagnosticar en tiempo real las APIs de Lanyard y Spotify mediante comandos directos y pruebas de red.
3. **Generación de Servidores y Scripts de Setup**: Crear scripts dinámicos de OAuth 2.0 con PKCE y loopback seguro (`127.0.0.1:8889`) para obtener el `SPOTIFY_REFRESH_TOKEN` e inyectarlo automáticamente en el entorno `.env`.
4. **Desarrollo del Digital Garden**: Desarrollar plugins AST de Remark (`remark-wikilinks.mjs`) y componentes de **Tarjetas Flotantes Hover Preview** estilo Obsidian con 0ms de latencia.

---

## 🎨 Sistema de Diseño: Liquid Glass & tsParticles

El portafolio utiliza una estética oscura ultramoderna conocida como **Liquid Glass (Cristal Líquido)**:

- **Efectos de Vidrio Esmerilado**: Uso de `backdrop-blur-xl`, bordes semitransparentes `border-white/10` y fondos con gradientes sutiles `bg-slate-950/80`.
- **Fondo de Partículas Interactivas**: Animación ligera y reactiva al puntero mediante `tsParticles` que simula una constelación cuántica sin penalizar el rendimiento del renderizado.
- **Aviso de Métricas y Privacidad**: Integración sutil de Microsoft Clarity con banner pop-up animado e interactivo.

```css
/* Token de Cristal Líquido en index.css */
.glass {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

---

## 🎵 Integración Dual de Spotify & Discord

Para mostrar la actividad en tiempo real, el widget reproductor implementa una **estrategia de respaldo dual (Dual Fallback)**:

1. **Estrategia Primaria (Lanyard Discord API)**:
   - Consulta el estado mediante WebSockets/REST desde Lanyard.
   - Si Discord está abierto con el estado de Spotify habilitado, la música actual se muestra al instante.
2. **Estrategia Secundaria (Spotify Web API con Refresh Token)**:
   - Si Discord está cerrado o sin estado activo, el sistema consulta directamente la API oficial de Spotify mediante un `SPOTIFY_REFRESH_TOKEN` renovado automáticamente.
3. **Herramienta de Setup Automatizada**:
   - Ejecutando `npm run spotify-setup`, se inicia un servidor local en el puerto `8889` que procesa el flujo OAuth 2.0 y guarda las credenciales en el archivo `.env` de forma segura.

---

## 🌿 Digital Garden: Markdown/MDX + WikiLinks de Obsidian

La sección de [[digital-garden-obsidian|Digital Garden & Blog]] permite crear y relacionar artículos utilizando la misma sintaxis que aplicaciones como **Obsidian**:

- **Sintaxis WikiLink (`[[slug]]`)**: Puedes citar notas con `[[quien-soy|Mi Perfil]]` o `[[markdown-style-guide]]`.
- **Hover Previews Flotantes (`LinkPreview.astro`)**: Al pasar el cursor sobre cualquier enlace interno, una tarjeta de cristal desplegará la vista previa de la nota sin interrumpir la lectura.
- **Filtro de Etiquetas (#tags)**: Clasificación interactiva con pills reactivos para explorar por temas como `#astro`, `#obsidian`, `#deepmind` o `#desarrollo`.

---

## 🚀 Conclusión

Este portafolio demuestra cómo la colaboración entre un desarrollador y un agente de inteligencia artificial avanzado como **Antigravity** permite crear productos digitales con una atención al detalle, rendimiento y arquitectura de nivel profesional en tiempo récord.

¿Quieres explorar cómo funciona el flujo de trabajo agentico? Revisa nuestro artículo dedicado: [[el-agente-antigravity-y-la-era-agentica|Desarrollo Agentico en Primera Persona]].
