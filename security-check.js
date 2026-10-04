#!/usr/bin/env node

/**
 * 🔒 SCRIPT DE VERIFICACIÓN DE SEGURIDAD
 *
 * Este script verifica que no hay datos sensibles en el repositorio
 * y que todas las medidas de seguridad están en su lugar.
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { globSync } from 'glob';

console.log('🔒 Ejecutando verificación de seguridad...\n');

const checks = [];

// Verificar que .env existe pero está ignorado
try {
  const envExists = existsSync('.env');
  const gitStatus = execSync('git status --porcelain .env', { encoding: 'utf8' });

  if (envExists && gitStatus.trim() === '') {
    checks.push({ name: '.env protegido', status: '✅', message: 'Archivo existe y está siendo ignorado por git' });
  } else if (!envExists) {
    checks.push({ name: '.env protegido', status: '⚠️', message: 'Archivo .env no existe - cópialo desde .env.example' });
  } else {
    checks.push({ name: '.env protegido', status: '❌', message: '¡PELIGRO! Archivo .env está siendo trackeado por git' });
  }
} catch (error) {
  checks.push({ name: '.env protegido', status: '❌', message: 'Error verificando .env: ' + error.message });
}

// Verificar que .gitignore contiene reglas de seguridad
try {
  const gitignoreContent = readFileSync('.gitignore', 'utf8');
  const hasEnvRules = gitignoreContent.includes('.env');
  const hasTokenRules = gitignoreContent.includes('*token*');
  const hasCredentialRules = gitignoreContent.includes('*credential*');

  if (hasEnvRules && hasTokenRules && hasCredentialRules) {
    checks.push({ name: '.gitignore seguro', status: '✅', message: 'Contiene reglas de protección de datos sensibles' });
  } else {
    checks.push({ name: '.gitignore seguro', status: '⚠️', message: 'Faltan algunas reglas de seguridad' });
  }
} catch (error) {
  checks.push({ name: '.gitignore seguro', status: '❌', message: 'Error leyendo .gitignore' });
}

// Verificar que .env.example existe
const envExampleExists = existsSync('.env.example');
if (envExampleExists) {
  checks.push({ name: '.env.example presente', status: '✅', message: 'Plantilla de variables disponible' });
} else {
  checks.push({ name: '.env.example presente', status: '❌', message: 'Plantilla .env.example faltante' });
}

// Verificar que archivos sensibles están siendo ignorados
try {
  const trackedSensitiveFiles = execSync('git ls-files | grep -E "(\\.env$|token|secret|credential|API_TOKENS)"', { encoding: 'utf8' });
  if (trackedSensitiveFiles.trim() === '') {
    checks.push({ name: 'Archivos sensibles', status: '✅', message: 'No hay archivos sensibles en el repositorio' });
  } else {
    checks.push({ name: 'Archivos sensibles', status: '❌', message: 'Archivos sensibles detectados: ' + trackedSensitiveFiles.trim() });
  }
} catch (error) {
  // Si grep no encuentra nada, retorna error - eso es bueno en este caso
  checks.push({ name: 'Archivos sensibles', status: '✅', message: 'No hay archivos sensibles en el repositorio' });
}

// Verificar secretos hardcodeados en código fuente
try {
  const sourceFiles = globSync('src/**/*.{astro,ts,js,tsx,jsx}', { ignore: ['**/node_modules/**'] });
  const secretPatterns = [
    { pattern: /ghp_[a-zA-Z0-9]{36}/g, name: 'GitHub Personal Access Token' },
    { pattern: /gho_[a-zA-Z0-9]{36}/g, name: 'GitHub OAuth Token' },
    { pattern: /ghu_[a-zA-Z0-9]{36}/g, name: 'GitHub User Token' },
    { pattern: /ghs_[a-zA-Z0-9]{36}/g, name: 'GitHub Server Token' },
    { pattern: /ghr_[a-zA-Z0-9]{36}/g, name: 'GitHub Refresh Token' },
    { pattern: /sk_live_[a-zA-Z0-9]{24,}/g, name: 'Stripe Secret Key' },
    { pattern: /AIza[a-zA-Z0-9_-]{35}/g, name: 'Google API Key' },
    { pattern: /ya29\.[a-zA-Z0-9_-]+/g, name: 'Google OAuth Token' },
  ];

  let foundSecrets = false;
  for (const file of sourceFiles) {
    const content = readFileSync(file, 'utf8');
    for (const { pattern, name } of secretPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        checks.push({ name: `Secreto hardcodeado: ${name}`, status: '❌', message: `Detectado en ${file}: ${matches[0].substring(0, 20)}...` });
        foundSecrets = true;
      }
    }
  }

  if (!foundSecrets) {
    checks.push({ name: 'Secretos en código', status: '✅', message: 'No se detectaron secretos hardcodeados en src/' });
  }
} catch (error) {
  checks.push({ name: 'Secretos en código', status: '⚠️', message: 'Error escaneando secretos: ' + error.message });
}

// Verificar documentación de seguridad
const securityDocExists = existsSync('SECURITY.md');
if (securityDocExists) {
  checks.push({ name: 'Documentación de seguridad', status: '✅', message: 'SECURITY.md presente' });
} else {
  checks.push({ name: 'Documentación de seguridad', status: '⚠️', message: 'SECURITY.md faltante' });
}

// Mostrar resultados
console.log('📋 RESULTADOS DE LA VERIFICACIÓN:\n');
checks.forEach(check => {
  console.log(`${check.status} ${check.name}: ${check.message}`);
});

console.log('\n' + '='.repeat(50));

const passed = checks.filter(c => c.status === '✅').length;
const warnings = checks.filter(c => c.status === '⚠️').length;
const failed = checks.filter(c => c.status === '❌').length;

console.log(`📊 Resumen: ${passed} ✅ | ${warnings} ⚠️ | ${failed} ❌`);

if (failed > 0) {
  console.log('\n🚨 HAY PROBLEMAS DE SEGURIDAD CRÍTICOS - REVISAR INMEDIATAMENTE');
  process.exit(1);
} else if (warnings > 0) {
  console.log('\n⚠️ Hay algunas advertencias - revisar cuando sea posible');
} else {
  console.log('\n🎉 ¡SEGURIDAD VERIFICADA! Todo en orden.');
}

console.log('\n💡 Para más información, consulta SECURITY.md');
