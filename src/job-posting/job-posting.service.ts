import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, JobPosting as JobPostingModel } from '@prisma/client';

@Injectable()
export class JobPostingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.JobPostingCreateInput): Promise<JobPostingModel> {
    return this.prisma.jobPosting.create({ data });
  }
}
