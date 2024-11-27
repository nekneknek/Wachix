// Service de vérification automatique du code
export class CodeVerifier {
  static verifyCode(code: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Vérification de la syntaxe
    try {
      new Function(code);
    } catch (e) {
      errors.push(`Erreur de syntaxe: ${e.message}`);
    }

    // Vérification des bonnes pratiques
    if (code.includes('var ')) {
      errors.push('Utilisez "const" ou "let" au lieu de "var"');
    }

    if (code.includes('==')) {
      errors.push('Utilisez "===" pour les comparaisons strictes');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Vérificateur de types TypeScript
export class TypeChecker {
  static checkTypes(code: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Vérification des types basiques
    if (code.includes(': any')) {
      errors.push('Évitez d\'utiliser le type "any"');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}