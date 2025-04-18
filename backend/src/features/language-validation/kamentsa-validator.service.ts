import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  suggestions: string[];
}

@Injectable()
export class KamentsaValidatorService {
  private readonly specialChars = ['ë', 's̈', 'ts̈', 'ñ'];
  private dictionary: any[] = [];
  private readonly logger = new Logger(KamentsaValidatorService.name);

  async onModuleInit() {
    await this.loadDictionary();
    this.logger.log(`Diccionario cargado con ${this.dictionary.length} palabras en onModuleInit`);
  }

  private async loadDictionary(): Promise<void> {
    try {
      const dictPath = path.join(
        __dirname,
        '../../../files/json/consolidated_dictionary.json',
      );

      if (!fs.existsSync(dictPath)) {
        this.logger.error('Diccionario JSON no encontrado');
        return;
      }

      const dictData = await fs.promises.readFile(dictPath, 'utf-8');
      const parsedData = JSON.parse(dictData);
      this.dictionary = parsedData?.sections?.diccionario?.content?.kamensta_espanol || [];
      this.logger.log(
        `Diccionario cargado con ${this.dictionary.length} palabras`,
      );
    } catch (error) {
      this.logger.error('Error cargando diccionario:', error);
      this.dictionary = [{ entrada: 'ts̈ëngbe' }, { entrada: 'bëts' }, { entrada: 'ñandë' }, { entrada: 's̈ënts̈a' }];
    }
  }

  normalizeText(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  validateGrammar(text: string): string[] {
    const errors: string[] = [];

    // Regla: Palabras que terminan en "ts̈" generalmente llevan "ë" antes
    const words = text.trim().split(/\s+/); // Divide el texto en palabras por espacios
    for (const word of words) {
      if (word.endsWith('ts̈') && word.length >= 3 && word[word.length - 2] !== 'ë') {
        errors.push('Los términos que terminan en "ts̈" generalmente llevan "ë" antes: "ëts̈"');
      }
    }

    // Regla: "s̈" generalmente va seguida de "ë"
    // Busca instancias de "s̈" que no son seguidas por "ë" o "ä"
    const sWithoutEPattern = /s̈(?![ëä])/g;
    if (errors.length === 0 && sWithoutEPattern.test(text)) {
      errors.push('La "s̈" generalmente va seguida de "ë" en Kamëntsá');
    }

    // Aquí se pueden añadir más reglas gramaticales en el futuro

    // Regla: Las palabras deben comenzar con una vocal o una consonante permitida
    const allowedInitialConsonants = ['b', 'd', 'g', 'k', 'm', 'n', 'p', 's', 't', 'ts', 'y']; // Lista de consonantes permitidas al inicio de una palabra
    for (const word of words) {
      const firstChar = word.charAt(0).toLowerCase();
      if (!['a', 'e', 'i', 'o', 'u', 'ë'].includes(firstChar) && !allowedInitialConsonants.includes(firstChar)) {
        errors.push(`La palabra "${word}" debe comenzar con una vocal o una consonante permitida (${allowedInitialConsonants.join(', ')}).`);
      }
    }

    return errors;
  }

  async validateText(text: string): Promise<ValidationResult> {
    if (this.dictionary.length === 0) {
      await this.loadDictionary();
    }
    const errors: string[] = [];
    const suggestions: string[] = [];

    const specialCharErrors = this.validateSpecialCharacters(text);
    errors.push(...specialCharErrors);

    const grammarErrors = this.validateGrammar(text);
    errors.push(...grammarErrors);

    if (errors.length > 0 || this.hasIncorrectSpecialChars(text)) {
      suggestions.push(...this.getSuggestions(text)); // getSuggestions might use normalizedText internally
    }

    // Check dictionary using original text (lowercase)
    const isValid =
      errors.length === 0 &&
      this.dictionary.some(
        (word: any) => this.normalizeText(word.entrada).toLowerCase() === this.normalizeText(text).toLowerCase()
      );

    // Keep normalizedText for potential use in suggestions or other logic
    const normalizedText = this.normalizeText(text);

    console.log('validateText:', { text, isValid, errors, suggestions }); // Log para depuración
    return { isValid, errors, suggestions };
  }

  validateSpecialCharacters(text: string): string[] {
    const errors: string[] = [];

    if (text.includes('ts') && !text.includes('ts̈')) {
      errors.push('El dígrafo "ts" debe llevar diéresis: "ts̈"');
    }

    if (text.includes('s') && !text.includes('s̈')) {
      errors.push('La "s" debe llevar diéresis: "s̈"');
    }

    if (text.includes('e') && !text.includes('ë') && (text.includes('s̈') || text.includes('ts̈'))) {
      errors.push('La "e" debe llevar diéresis: "ë"');
    }

    return errors;
  }

 getWordTranslation(word: string): string {
    const translation = this.dictionary.find(entry => entry.entrada === word);
    if (translation) {
      return translation;
    }

    // Buscar sugerencias cercanas usando la distancia de Levenshtein
    const closeMatches = this.dictionary.filter((dictWord) => {
      const distance = this.levenshteinDistance(dictWord.entrada, word);
      return distance <= 2;
    });

    if (closeMatches.length > 0) {
      return `¿Quiso decir "${closeMatches[0].entrada}"?`; // Devolver la primera sugerencia
    }

    return 'Traducción no encontrada';
  }

  private hasIncorrectSpecialChars(text: string): boolean {
    let incorrectChars = false;

    if (text.includes('ts') && !text.includes('ts̈')) {
      incorrectChars = true;
    }

    if (text.includes('s') && !text.includes('s̈')) {
      incorrectChars = true;
    }

    if (text.includes('e') && !text.includes('ë') && (text.includes('s̈') || text.includes('ts̈'))) {
      incorrectChars = true;
    }

    return incorrectChars;
  }

  getSuggestions(text: string): string[] {
    const suggestions: string[] = [];
    const normalized = this.normalizeText(text);

    const exactMatches = this.dictionary.filter(
      (word: any) => this.normalizeText(word.entrada) === normalized,
    );
    if (exactMatches.length > 0) {
      return exactMatches.map((word: any) => `Corrección: "${word.entrada}"`);
    }

    const closeMatches = this.dictionary.filter((word: any) => {
      const distance = this.levenshteinDistance(
        this.normalizeText(word.entrada),
        normalized,
      );
      return distance <= 2;
    });

    closeMatches.forEach((word: any) => {
      suggestions.push(
        `¿Quiso decir "${word.entrada}"? (${this.getWordTranslation(word.entrada)})`,
      );
    });

    return suggestions.length > 0
      ? suggestions
      : ['Consulte el diccionario Kamëntsá para referencia'];
  }

  private levenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = Array(b.length + 1)
      .fill(null)
      .map(() => Array(a.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) {
      matrix[i][0] = i;
    }
    for (let j = 0; j <= b.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // reemplazo
            Math.min(
              matrix[i - 1][j] + 1, // eliminación
              matrix[i][j - 1] + 1 // inserción
            )
          );
        }
      }
    }

    return matrix[a.length][b.length];
  }
}
