/**
 * Matrix / Pixelated Text Scramble Effect
 * Cycles through cyber and geometric glyphs before settling on the target text
 */
const GLYPHS = '01#@%&_=/+*~<>[]{}—▲◆■';

export function scrambleText(
  targetText: string,
  onUpdate: (currentText: string) => void,
  onComplete?: () => void,
  durationMs: number = 400
) {
  const steps = 12;
  const stepTime = durationMs / steps;
  let currentStep = 0;

  const interval = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;

    // Build scrambled string
    const result = targetText
      .split('')
      .map((char, index) => {
        if (char === ' ' || char === '\n') return char;
        if (index / targetText.length < progress) {
          return char;
        }
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      })
      .join('');

    onUpdate(result);

    if (currentStep >= steps) {
      clearInterval(interval);
      onUpdate(targetText);
      if (onComplete) onComplete();
    }
  }, stepTime);

  return () => clearInterval(interval);
}
