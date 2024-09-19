import { Module } from '@nestjs/common';
import { JobPostingService } from './job-posting.service';
import { JobPostingController } from './job-posting.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [JobPostingService, PrismaService],
  controllers: [JobPostingController],
})
export class JobPostingModule {}
