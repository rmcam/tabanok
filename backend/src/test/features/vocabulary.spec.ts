import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyService } from '../../features/vocabulary/vocabulary.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vocabulary } from '../../features/vocabulary/entities/vocabulary.entity';
import { Repository } from 'typeorm';

describe('VocabularyService', () => {
  let service: VocabularyService;
  let repository: Repository<Vocabulary>;

  const mockVocabularyRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VocabularyService,
        {
          provide: getRepositoryToken(Vocabulary),
          useValue: mockVocabularyRepository,
        },
      ],
    }).compile();

    service = module.get<VocabularyService>(VocabularyService);
    repository = module.get<Repository<Vocabulary>>(getRepositoryToken(Vocabulary));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new vocabulary entry', async () => {
      const createVocabularyDto = { 
        wordKamentsa: 'palabra', 
        translation: 'word',
        wordSpanish: 'palabra',
        topicId: 'topic-id'
      };
      const savedVocabulary = { id: '1', ...createVocabularyDto };

      mockVocabularyRepository.create.mockReturnValue(savedVocabulary);
      mockVocabularyRepository.save.mockResolvedValue(savedVocabulary);

      const result = await service.create(createVocabularyDto);
      expect(result).toEqual(savedVocabulary);
      expect(mockVocabularyRepository.create).toHaveBeenCalledWith(createVocabularyDto);
      expect(mockVocabularyRepository.save).toHaveBeenCalledWith(savedVocabulary);
    });
  });

  describe('findAll', () => {
    it('should return an array of vocabularies', async () => {
      const vocabularies = [{ id: '1', wordKamentsa: 'palabra', translation: 'word' }];
      mockVocabularyRepository.find.mockResolvedValue(vocabularies);

      const result = await service.findAll();
      expect(result).toEqual(vocabularies);
      expect(mockVocabularyRepository.find).toHaveBeenCalled();
    });
  });

  // Agregar más pruebas para las demás funciones (findOne, update, remove, etc.)
});
