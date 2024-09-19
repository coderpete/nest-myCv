import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// import { Request as RequestInterface } from 'express';

import { EmployerService } from './employer.service';
import { EmployerDto } from './dto/employer.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async create(
    @Body() data: EmployerDto,
    // @Request() req: RequestInterface,
  ): Promise<any> {
    const createData: Prisma.EmployerCreateInput = data;
    return this.employerService.create(createData);
  }
}
