import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ResumeService } from './resume/resume.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly resumeService: ResumeService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async fetchEverythingForUser(accountId: string): Promise<any[]> {
    const resumes = await this.resumeService.fetchAllForUser(accountId);
    const jobPostingIds = resumes.map((resume) => resume.jobPostingId);

    const jobPostings = await this.prisma.jobPosting.findMany({
      where: { id: { in: jobPostingIds as string[] } },
    });

    const employerIds = jobPostings.map((jobPosting) => jobPosting.employerId);
    const employers = await this.prisma.employer.findMany({
      where: { id: { in: employerIds as string[] } },
    });

    const output = resumes.map((resume) => {
      const jobPosting = jobPostings.find(
        (jobPosting) => jobPosting.id === resume.jobPostingId,
      );
      const employer = employers.find(
        (employer) => employer.id === jobPosting?.employerId,
      );
      return { resume, jobPosting, employer };
    });
    return output;
  }
}
