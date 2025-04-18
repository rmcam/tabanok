import { Test, TestingModule } from '@nestjs/testing';
import { MentorService } from '../mentor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Gamification } from '../../entities/gamification.entity';
import { CulturalRewardService } from '../cultural-reward.service';
import { Mentor } from '../../entities/mentor.entity';
import { MentorSpecialization } from '../../entities/mentor-specialization.entity';
import { MentorshipRelation, MentorshipType } from '../../entities/mentorship-relation.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MentorService', () => {
  let service: MentorService;
  const mockGamificationRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };
  const mockCulturalRewardService = {
    getCulturalProgress: jest.fn(),
  };
  const mockMentorRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };
  const mockSpecializationRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };
  const mockMentorshipRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MentorService,
        {
          provide: getRepositoryToken(Gamification),
          useValue: mockGamificationRepository,
        },
        {
          provide: CulturalRewardService,
          useValue: mockCulturalRewardService,
        },
        {
          provide: getRepositoryToken(Mentor),
          useValue: mockMentorRepository,
        },
        {
          provide: getRepositoryToken(MentorSpecialization),
          useValue: mockSpecializationRepository,
        },
        {
          provide: getRepositoryToken(MentorshipRelation),
          useValue: mockMentorshipRepository,
        },
      ],
    }).compile();

    service = module.get<MentorService>(MentorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkMentorEligibility', () => {
    it('should return isEligible true if cultural value is above threshold', async () => {
      mockCulturalRewardService.getCulturalProgress.mockResolvedValue({ culturalValue: 600 });
      const result = await service.checkMentorEligibility('user-id', MentorshipType.DOCENTE_ESTUDIANTE);
      expect(result.isEligible).toBe(true);
    });

    it('should return isEligible false if cultural value is below threshold', async () => {
      mockCulturalRewardService.getCulturalProgress.mockResolvedValue({ culturalValue: 400 });
      const result = await service.checkMentorEligibility('user-id', MentorshipType.DOCENTE_ESTUDIANTE);
      expect(result.isEligible).toBe(false);
    });
  });

  describe('requestMentorship', () => {
    it('should throw BadRequestException if mentorship type is invalid', async () => {
      await expect(service.requestMentorship('app-id', 'mentor-id', 'spec', 'invalid' as MentorshipType)).rejects.toThrowError(BadRequestException);
    });

    it('should throw NotFoundException if mentor is not found', async () => {
      mockGamificationRepository.findOne.mockResolvedValue(null);
      await expect(service.requestMentorship('app-id', 'mentor-id', 'spec', MentorshipType.DOCENTE_ESTUDIANTE)).rejects.toThrowError(NotFoundException);
    });
  });
});
