import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ResumeController],
  providers: [PrismaService, ResumeService],
})
export class ResumeModule {}
