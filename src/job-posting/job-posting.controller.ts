import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JobPostingService } from './job-posting.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request as RequestInterface } from 'express';
import { Prisma } from '@prisma/client';
import { JobPostingDto } from './dto/job-posting.dto';

@Controller('job-posting')
export class JobPostingController {
  constructor(private readonly jobPostingService: JobPostingService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async create(@Body() data: JobPostingDto, @Request() req: RequestInterface) {
    const currentUser = req.user as any;
    console.log(currentUser, typeof currentUser, 'currentUser');
    const createData: Prisma.JobPostingCreateInput = data;
    console.log({ createData }, 'resumeCreateData');
    return this.jobPostingService.create(createData);
  }
}
