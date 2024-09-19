import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ResumeService } from './resume/resume.service';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { ResumeModule } from './resume/resume.module';
import { JobPostingModule } from './job-posting/job-posting.module';
import { JobPostingService } from './job-posting/job-posting.service';
import { EmployerModule } from './employer/employer.module';
import { EmployerService } from './employer/employer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PassportModule,
    ResumeModule,
    JobPostingModule,
    EmployerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmployerService,
    JobPostingService,
    PrismaService,
    ResumeService,
  ],
})
export class AppModule {}
