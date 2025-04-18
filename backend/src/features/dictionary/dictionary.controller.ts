import { Controller, Get, Query, Inject } from '@nestjs/common';
import { KamentsaValidatorService } from '../language-validation/kamentsa-validator.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(@Inject(KamentsaValidatorService) private readonly kamentsaValidatorService: KamentsaValidatorService) { }

  @Get('search')
  async search(@Query('q') query: string) {
    const normalizedWord = this.kamentsaValidatorService.normalizeText(query);
    let entry = (this.kamentsaValidatorService as any).dictionary.find(
      (dictEntry: any) => {
        if (typeof dictEntry === 'object' && dictEntry !== null) {
          const textToNormalize = dictEntry.entrada;
          const normalizedText = this.kamentsaValidatorService.normalizeText(textToNormalize);
          return normalizedText.includes(normalizedWord) || (dictEntry.significados && dictEntry.significados.some((significado: any) => this.kamentsaValidatorService.normalizeText(significado.definicion).includes(normalizedWord)));
        }
        return false;
      }
    );

    if (!entry) {
      const spanishEntry = (this.kamentsaValidatorService as any).dictionary.find(
        (dictEntry: any) => {
          if (typeof dictEntry === 'object' && dictEntry !== null && dictEntry.equivalentes) {
            const textToNormalize = dictEntry.entrada;
            const normalizedText = this.kamentsaValidatorService.normalizeText(textToNormalize);
            return normalizedText.includes(normalizedWord);
          }
          return false;
        }
      );
      if (spanishEntry) {
        entry = (this.kamentsaValidatorService as any).dictionary.find(
          (dictEntry: any) => {
            if (typeof dictEntry === 'object' && dictEntry !== null && dictEntry.entrada === spanishEntry.equivalentes[0].palabra) {
              return true;
            }
            return false;
          }
        );
      }
    }

    return entry ? { entry } : { entry: null };
  }
}
