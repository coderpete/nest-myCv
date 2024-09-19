import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Employer as EmployerModel } from '@prisma/client';

@Injectable()
export class EmployerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.EmployerCreateInput): Promise<EmployerModel> {
    return this.prisma.employer.create({ data });
  }
}
