import React, { useState, useEffect, useCallback } from 'react';

// Word list for Diceware Passphrases (cryptographically random selection)
const PASSPHRASE_WORDS = [
  'alpha', 'beacon', 'cipher', 'delta', 'echo', 'falcon', 'matrix', 'nexus',
  'orbit', 'pixel', 'quantum', 'pulse', 'shadow', 'titan', 'vector', 'vertex',
  'zenith', 'arcade', 'breeze', 'cosmic', 'drift', 'ember', 'frost', 'galaxy',
  'horizon', 'infinity', 'jungle', 'kinetic', 'lunar', 'magnet', 'nebula', 'ocean',
  'phantom', 'quartz', 'radar', 'starlight', 'thunder', 'utopia', 'vortex', 'wildfire',
  'xenon', 'yellow', 'zodiac', 'anchor', 'blaze', 'crystal', 'dynamo', 'element',
  'flame', 'glacier', 'haven', 'impulse', 'joule', 'kronos', 'legend', 'mirage',
  'nova', 'oasis', 'photon', 'quasar', 'radiance', 'spectrum', 'tsunami', 'universe',
  'velocity', 'wave', 'xray', 'yield', 'zenith', 'astral', 'binary', 'cyber'
];

type Mode = 'password' | 'passphrase';

export default function PasswordGenerator() {
  const [mode, setMode] = useState<Mode>('password');

  // Password Options
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(18);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);

  // Passphrase Options
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState('-');
  const [capitalize, setCapitalize] = useState(true);
  const [includeNumberInPhrase, setIncludeNumberInPhrase] = useState(true);

  // State & History
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  // Generate Cryptographically Secure Password
  const generatePassword = useCallback(() => {
    if (mode === 'passphrase') {
      let phraseWords: string[] = [];
      const array = new Uint32Array(wordCount);
      if (typeof window !== 'undefined' && window.crypto) {
        window.crypto.getRandomValues(array);
        for (let i = 0; i < wordCount; i++) {
          let word = PASSPHRASE_WORDS[array[i] % PASSPHRASE_WORDS.length];
          if (capitalize) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
          }
          phraseWords.push(word);
        }
      } else {
        for (let i = 0; i < wordCount; i++) {
          let word = PASSPHRASE_WORDS[Math.floor(Math.random() * PASSPHRASE_WORDS.length)];
          if (capitalize) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
          }
          phraseWords.push(word);
        }
      }

      if (includeNumberInPhrase) {
        const randNum = Math.floor(Math.random() * 90 + 10);
        phraseWords.push(randNum.toString());
      }

      const newPassphrase = phraseWords.join(separator);
      setPassword(newPassphrase);
      setCopied(false);
      setHistory((prev) => [newPassphrase, ...prev.slice(0, 4)]);
      return;
    }

    // Standard Cryptographic Password Generator
    let lowercaseSet = 'abcdefghijklmnopqrstuvwxyz';
    let uppercaseSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbersSet = '0123456789';
    let symbolsSet = '!@#$%^&*()_+-=[]{}|;:,.<>?/';

    if (excludeAmbiguous) {
      lowercaseSet = lowercaseSet.replace(/[l]/g, '');
      uppercaseSet = uppercaseSet.replace(/[IO]/g, '');
      numbersSet = numbersSet.replace(/[01]/g, '');
      symbolsSet = symbolsSet.replace(/[|]/g, '');
    }

    let charset = '';
    const guaranteedChars: string[] = [];

    if (includeLowercase && lowercaseSet.length > 0) {
      charset += lowercaseSet;
      guaranteedChars.push(lowercaseSet[Math.floor(Math.random() * lowercaseSet.length)]);
    }
    if (includeUppercase && uppercaseSet.length > 0) {
      charset += uppercaseSet;
      guaranteedChars.push(uppercaseSet[Math.floor(Math.random() * uppercaseSet.length)]);
    }
    if (includeNumbers && numbersSet.length > 0) {
      charset += numbersSet;
      guaranteedChars.push(numbersSet[Math.floor(Math.random() * numbersSet.length)]);
    }
    if (includeSymbols && symbolsSet.length > 0) {
      charset += symbolsSet;
      guaranteedChars.push(symbolsSet[Math.floor(Math.random() * symbolsSet.length)]);
    }

    if (charset === '') {
      setPassword('');
      return;
    }

    let passChars: string[] = [];
    const array = new Uint32Array(length);

    if (typeof window !== 'undefined' && window.crypto) {
      window.crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) {
        passChars.push(charset[array[i] % charset.length]);
      }
    } else {
      for (let i = 0; i < length; i++) {
        passChars.push(charset.charAt(Math.floor(Math.random() * charset.length)));
      }
    }

    // Replace first few chars with guaranteed chars to satisfy all selected types
    for (let i = 0; i < guaranteedChars.length && i < length; i++) {
      passChars[i] = guaranteedChars[i];
    }

    // Shuffle characters
    for (let i = passChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [passChars[i], passChars[j]] = [passChars[j], passChars[i]];
    }

    const newPassword = passChars.join('');
    setPassword(newPassword);
    setCopied(false);
    setHistory((prev) => [newPassword, ...prev.slice(0, 4)]);
  }, [
    mode,
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeAmbiguous,
    wordCount,
    separator,
    capitalize,
    includeNumberInPhrase,
  ]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = async (textToCopy?: string) => {
    const text = textToCopy || password;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  // Calculate Bit Entropy
  const calculateEntropy = (): { bits: number; crackTime: string; label: string; color: string; textCol: string } => {
    if (!password) {
      return { bits: 0, crackTime: 'Instantáneo', label: 'Sin Datos', color: 'bg-white/10', textCol: 'text-white/40' };
    }

    let poolSize = 0;
    if (mode === 'passphrase') {
      poolSize = PASSPHRASE_WORDS.length;
      const bits = Math.floor(wordCount * Math.log2(poolSize));
      if (bits < 40) return { bits, crackTime: 'Días', label: 'Débil', color: 'bg-rose-500', textCol: 'text-rose-400' };
      if (bits < 60) return { bits, crackTime: 'Años', label: 'Aceptable', color: 'bg-amber-400', textCol: 'text-amber-400' };
      if (bits < 80) return { bits, crackTime: 'Siglos', label: 'Robusta', color: 'bg-cyber-cyan', textCol: 'text-cyber-cyan' };
      return { bits, crackTime: 'Millones de años', label: 'Imparable 🔒', color: 'bg-cyber-green', textCol: 'text-cyber-green' };
    }

    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

    if (poolSize === 0) poolSize = 1;

    const bits = Math.floor(password.length * Math.log2(poolSize));

    if (bits < 40) return { bits, crackTime: '< 1 segundo', label: 'Vulnerable', color: 'bg-rose-500', textCol: 'text-rose-400' };
    if (bits < 60) return { bits, crackTime: 'Horas / Días', label: 'Débil', color: 'bg-amber-500', textCol: 'text-amber-400' };
    if (bits < 80) return { bits, crackTime: 'Décadas', label: 'Buena', color: 'bg-amber-400', textCol: 'text-amber-300' };
    if (bits < 100) return { bits, crackTime: 'Siglos', label: 'Fuerte 🔒', color: 'bg-cyber-cyan', textCol: 'text-cyber-cyan' };
    return { bits, crackTime: 'Billones de años 🌌', label: 'Cuántica / Imparable 🛡️', color: 'bg-cyber-green', textCol: 'text-cyber-green' };
  };

  const entropyInfo = calculateEntropy();

  // Character breakdown inspector
  const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
  const lowercaseCount = (password.match(/[a-z]/g) || []).length;
  const numberCount = (password.match(/[0-9]/g) || []).length;
  const symbolCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-center space-x-3 mb-2">
        <button
          onClick={() => setMode('password')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all ${
            mode === 'password'
              ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 shadow-lg shadow-cyber-cyan/10'
              : 'glass text-white/70 hover:text-white hover:border-white/20'
          }`}
        >
          🔐 Contraseña Criptográfica
        </button>
        <button
          onClick={() => setMode('passphrase')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-xs md:text-sm transition-all ${
            mode === 'passphrase'
              ? 'bg-cyber-green/20 text-cyber-green border border-cyber-green/40 shadow-lg shadow-cyber-green/10'
              : 'glass text-white/70 hover:text-white hover:border-white/20'
          }`}
        >
          💬 Frase de Paso (Diceware)
        </button>
      </div>

      {/* Main Password Output Display Card */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-white/50 border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
            <span>CLAVE GENERADA ({password.length} CARACTERES)</span>
          </div>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="hover:text-white transition-colors flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showPassword ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a9.957 9.957 0 014.122-.863c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
              )}
            </svg>
            <span>{showPassword ? 'Ocultar' : 'Mostrar'}</span>
          </button>
        </div>

        {/* Display Text Area */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-2">
          <div className="flex-1 w-full overflow-x-auto no-scrollbar">
            {showPassword ? (
              <span className="text-xl md:text-3xl font-mono text-white break-all tracking-wider font-bold select-all">
                {password || 'Selecciona al menos una opción'}
              </span>
            ) : (
              <span className="text-xl md:text-3xl font-mono text-cyber-cyan tracking-widest font-bold">
                {'•'.repeat(password.length || 12)}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => copyToClipboard()}
              disabled={!password}
              className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 font-semibold text-sm ${
                copied
                  ? 'bg-cyber-green/20 text-cyber-green border border-cyber-green/50 shadow-lg shadow-cyber-green/10'
                  : 'glass-pill text-cyber-cyan hover:bg-cyber-cyan/20 border-cyber-cyan/40 hover:border-cyber-cyan'
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  <span>Copiar Clave</span>
                </>
              )}
            </button>

            <button
              onClick={generatePassword}
              title="Regenerar contraseña"
              className="glass p-3 rounded-xl text-white/80 hover:text-cyber-cyan hover:border-cyber-cyan/40 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Character Breakdown Inspector (Only mode=password) */}
        {mode === 'password' && (
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/5 text-center text-[11px] font-mono">
            <div className="glass rounded-lg py-1.5 px-2">
              <span className="text-white/40 block">MAYÚS</span>
              <span className="text-cyber-cyan font-bold">{uppercaseCount}</span>
            </div>
            <div className="glass rounded-lg py-1.5 px-2">
              <span className="text-white/40 block">MINÚS</span>
              <span className="text-white font-bold">{lowercaseCount}</span>
            </div>
            <div className="glass rounded-lg py-1.5 px-2">
              <span className="text-white/40 block">NÚMEROS</span>
              <span className="text-cyber-green font-bold">{numberCount}</span>
            </div>
            <div className="glass rounded-lg py-1.5 px-2">
              <span className="text-white/40 block">SÍMBOLOS</span>
              <span className="text-amber-400 font-bold">{symbolCount}</span>
            </div>
          </div>
        )}
      </div>

      {/* Security & Entropy Metrics */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 bg-black/40 backdrop-blur-lg space-y-3">
        <div className="flex justify-between items-center text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="text-white/70">ENTROPÍA ESTIMADA:</span>
            <span className="text-white font-bold">{entropyInfo.bits} Bits</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white/50">TIEMPO DE ATAQUE:</span>
            <span className={`font-bold ${entropyInfo.textCol}`}>{entropyInfo.crackTime}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex gap-1 p-0.5">
          {[20, 40, 60, 80, 100, 120].map((stepBits) => (
            <div
              key={stepBits}
              className={`h-full flex-1 rounded-full transition-all duration-500 ${
                entropyInfo.bits >= stepBits ? entropyInfo.color : 'bg-transparent'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Config Controls */}
      <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 bg-black/40 backdrop-blur-lg space-y-6">
        
        {mode === 'password' ? (
          <>
            {/* Length Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white/90 font-medium text-sm font-mono">LONGITUD DE CLAVE</label>
                <span className="text-cyber-cyan font-mono font-bold text-lg px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-xl">
                  {length} caracteres
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
              />
            </div>

            {/* Checkbox Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'uppercase', label: 'Mayúsculas (A-Z)', state: includeUppercase, setter: setIncludeUppercase },
                { id: 'lowercase', label: 'Minúsculas (a-z)', state: includeLowercase, setter: setIncludeLowercase },
                { id: 'numbers', label: 'Números (0-9)', state: includeNumbers, setter: setIncludeNumbers },
                { id: 'symbols', label: 'Símbolos (!@#$%)', state: includeSymbols, setter: setIncludeSymbols },
              ].map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyber-cyan/30 transition-all cursor-pointer select-none"
                  onClick={() => option.setter(!option.state)}
                >
                  <span className="text-white/80 text-sm font-medium">{option.label}</span>
                  <div className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${option.state ? 'bg-cyber-cyan' : 'bg-white/20'}`}>
                    <div className={`w-4 h-4 bg-black rounded-full shadow-md transform transition-transform duration-300 ${option.state ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Exclude Ambiguous Option */}
            <div
              className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer select-none"
              onClick={() => setExcludeAmbiguous(!excludeAmbiguous)}
            >
              <div className="space-y-0.5">
                <span className="text-white/90 text-sm font-medium block">Excluir Caracteres Ambiguos</span>
                <span className="text-white/40 text-xs font-mono">Evita confusión visual con 0, O, l, 1, I, |</span>
              </div>
              <div className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${excludeAmbiguous ? 'bg-cyber-green' : 'bg-white/20'}`}>
                <div className={`w-4 h-4 bg-black rounded-full shadow-md transform transition-transform duration-300 ${excludeAmbiguous ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Passphrase Options */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white/90 font-medium text-sm font-mono">CANTIDAD DE PALABRAS</label>
                <span className="text-cyber-green font-mono font-bold text-lg px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded-xl">
                  {wordCount} palabras
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="8"
                value={wordCount}
                onChange={(e) => setWordCount(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyber-green"
              />
            </div>

            {/* Separator selection */}
            <div className="space-y-2">
              <label className="text-white/70 font-mono text-xs block">SEPARADOR DE PALABRAS</label>
              <div className="flex flex-wrap gap-2">
                {['- (Guion)', '_ (Guion bajo)', '. (Punto)', '  (Espacio)'].map((sep) => {
                  const char = sep.split(' ')[0];
                  return (
                    <button
                      key={sep}
                      onClick={() => setSeparator(char)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        separator === char
                          ? 'bg-cyber-green/20 text-cyber-green border border-cyber-green/40'
                          : 'glass text-white/60 hover:text-white'
                      }`}
                    >
                      {sep}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Passphrase Switches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer select-none"
                onClick={() => setCapitalize(!capitalize)}
              >
                <span className="text-white/80 text-sm font-medium">Mayúscula Inicial</span>
                <div className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${capitalize ? 'bg-cyber-green' : 'bg-white/20'}`}>
                  <div className={`w-4 h-4 bg-black rounded-full shadow-md transform transition-transform duration-300 ${capitalize ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
              </div>

              <div
                className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer select-none"
                onClick={() => setIncludeNumberInPhrase(!includeNumberInPhrase)}
              >
                <span className="text-white/80 text-sm font-medium">Adjuntar Número</span>
                <div className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${includeNumberInPhrase ? 'bg-cyber-green' : 'bg-white/20'}`}>
                  <div className={`w-4 h-4 bg-black rounded-full shadow-md transform transition-transform duration-300 ${includeNumberInPhrase ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="btn-primary w-full py-4 rounded-xl text-white font-bold text-base shadow-xl shadow-cyber-cyan/20 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Generar Nueva Clave Segura</span>
        </button>
      </div>

      {/* History Log Accordion */}
      {history.length > 0 && (
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-black/40 backdrop-blur-lg space-y-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center space-x-2 text-xs font-mono text-white/70 hover:text-cyber-cyan transition-colors"
            >
              <svg className={`w-4 h-4 transform transition-transform ${showHistory ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span>HISTORIAL DE CLAVES GENERADAS ({history.length})</span>
            </button>

            <button
              onClick={() => setHistory([])}
              className="text-[11px] font-mono text-white/40 hover:text-rose-400 transition-colors"
            >
              Limpiar
            </button>
          </div>

          {showHistory && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              {history.map((hPass, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-all font-mono text-xs"
                >
                  <span className="text-white/80 truncate pr-4">{hPass}</span>
                  <button
                    onClick={() => copyToClipboard(hPass)}
                    className="text-cyber-cyan hover:text-white font-bold text-xs flex-shrink-0"
                  >
                    Copiar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
