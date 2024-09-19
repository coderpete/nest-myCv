import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Resume as ResumeModel } from '@prisma/client';

@Injectable()
export class ResumeService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ResumeCreateInput): Promise<ResumeModel> {
    return this.prisma.resume.create({ data });
  }

  async update(params: {
    where: Prisma.ResumeWhereUniqueInput;
    data: Prisma.ResumeUpdateInput;
  }): Promise<ResumeModel> {
    const { where, data } = params;
    return await this.prisma.resume.update({
      data,
      where,
    });
  }

  async fetchAllForUser(accountId: string): Promise<ResumeModel[]> {
    if (!accountId) {
      return [];
    }
    return await this.prisma.resume.findMany({
      where: { accountId },
    });
  }

  // async fetchUnique(
  //   userWhereUniqueInput: Prisma.ResumeWhereUniqueInput,
  // ): Promise<ResumeModel | null> {
  //   return this.prisma.resume.findUnique({ where: userWhereUniqueInput });
  // }

  // async fetchByEmployer(employerId: string): Promise<ResumeModel | null> {
  //   console.log({ employerId }, 'querying by employer');
  //   const record = await this.prisma.resume.findFirst({
  //     where: { employerId },
  //   });
  //   console.log({ record }, 'found record');
  //   return record;
  // }
}
