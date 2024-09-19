import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request as RequestInterface } from 'express';
import { ResumeCreateDto } from './dto/resume.dto';
import { Prisma } from '@prisma/client';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async create(
    @Body() data: ResumeCreateDto,
    @Request() req: RequestInterface,
  ): Promise<any> {
    const currentUser = req.user as any;
    console.log(currentUser, typeof currentUser, 'currentUser');
    const resumeCreateData: Prisma.ResumeCreateInput = {
      accountId: currentUser?.id,
      ...data,
    };
    console.log({ resumeCreateData }, 'resumeCreateData');
    return this.resumeService.create(resumeCreateData);
  }

  @Get('all-for-user')
  @UseGuards(JwtGuard)
  async fetchAll(@Request() req: RequestInterface) {
    const currentUser = req.user as any;
    return this.resumeService.fetchAllForUser(currentUser?.id);
  }
}
