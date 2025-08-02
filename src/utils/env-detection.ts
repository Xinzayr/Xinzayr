/**
 * Utilidad para detectar el entorno de despliegue
 * Permite diferenciar entre versión estática (GitHub Pages) y dinámica (Vercel)
 */

export interface DeploymentInfo {
  platform: 'vercel' | 'github-pages' | 'local' | 'unknown';
  isDynamic: boolean;
  isStatic: boolean;
  displayName: string;
  alternativeUrl?: string;
}

export function getDeploymentInfo(): DeploymentInfo {
  // En el lado del cliente, usar variables de entorno públicas
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const deployEnv = import.meta.env.PUBLIC_DEPLOY_ENV;

    if (hostname.includes('vercel.app') || deployEnv === 'vercel') {
      return {
        platform: 'vercel',
        isDynamic: true,
        isStatic: false,
        displayName: 'Vercel (Dinámico)',
        alternativeUrl: 'https://xinzayr.github.io'
      };
    }

    if (hostname.includes('github.io') || deployEnv === 'github-pages') {
      return {
        platform: 'github-pages',
        isDynamic: false,
        isStatic: true,
        displayName: 'GitHub Pages (Estático)',
        alternativeUrl: 'https://xinzayr.vercel.app'
      };
    }

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return {
        platform: 'local',
        isDynamic: true,
        isStatic: false,
        displayName: 'Desarrollo Local'
      };
    }
  }

  // En el lado del servidor, usar variables de entorno
  const deployEnv = import.meta.env.PUBLIC_DEPLOY_ENV;
  const vercelEnv = import.meta.env.VERCEL;

  if (vercelEnv || deployEnv === 'vercel') {
    return {
      platform: 'vercel',
      isDynamic: true,
      isStatic: false,
      displayName: 'Vercel (Dinámico)',
      alternativeUrl: 'https://xinzayr.github.io'
    };
  }

  if (deployEnv === 'github-pages') {
    return {
      platform: 'github-pages',
      isDynamic: false,
      isStatic: true,
      displayName: 'GitHub Pages (Estático)',
      alternativeUrl: 'https://xinzayr.vercel.app'
    };
  }

  return {
    platform: 'unknown',
    isDynamic: false,
    isStatic: true,
    displayName: 'Desconocido'
  };
}

/**
 * Hook para obtener información del entorno en componentes React
 */
export function useDeploymentInfo(): DeploymentInfo {
  if (typeof window === 'undefined') {
    return getDeploymentInfo();
  }

  return getDeploymentInfo();
}

/**
 * Constantes para URLs de recursos externos
 */
export const EXTERNAL_RESOURCES = {
  // Repositorio de medios en GitHub
  GITHUB_MEDIA_BASE: 'https://raw.githubusercontent.com/xinzayr/xinzayr-media/main',

  // URLs de perfil
  GRAVATAR: 'https://gravatar.com/xinzayr',
  GITHUB_PROFILE: 'https://github.com/xinzayr',

  // Redes sociales
  X_TWITTER: 'https://x.com/xinzayr',
  LINKEDIN: 'https://linkedin.com/in/johnny-bryan-alvarez-veliz-565544282',
  DISCORD_INVITE: 'https://discord.gg/xinzayr',
  INSTAGRAM: 'https://instagram.com/xinzayr',

  // URLs de donación y apoyo
  PAYPAL: 'https://paypal.me/xinzayr',
  KOFI: 'https://ko-fi.com/xinzayr',
  PATREON: 'https://patreon.com/xinzayr',
  BUYMEACOFFEE: 'https://buymeacoffee.com/xinzayr',
  GITHUB_SPONSORS: 'https://github.com/sponsors/xinzayr'
} as const;
