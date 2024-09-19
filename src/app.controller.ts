import { Request as RequestInterface } from 'express';
import {
  Body,
  Controller,
  Get,
  // HttpStatus,
  // Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
// import { Redirect } from '@nestjsplus/redirect';

import { AppService } from './app.service';
import { ResumeService } from './resume/resume.service';
// import { Prisma, Resume as ResumeModel } from '@prisma/client';
import { JwtGuard } from './auth/guards/jwt.guard';
import { SubmitResumeDto } from './dto/submit-resume.dto';
import { JobPostingService } from './job-posting/job-posting.service';
import { EmployerService } from './employer/employer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly employerService: EmployerService,
    private readonly jobPostingService: JobPostingService,
    private readonly resumeService: ResumeService,
  ) {}

  @Get()
  getHello(): string {
    console.log('fetching hello');
    return this.appService.getHello();
  }

  @Get('resumes')
  @UseGuards(JwtGuard)
  async fetchAllResumes(@Request() req: RequestInterface): Promise<any[]> {
    console.log('fetching everything...');
    const currentUser = req.user as any;
    const accountId = currentUser?.id;
    const everything = await this.appService.fetchEverythingForUser(accountId);
    console.log({ everything }, 'found resumes');

    return everything;
  }

  @Post('submit-resume')
  @UseGuards(JwtGuard)
  async submitResume(
    // @Body() data: SubmitResumeDto,
    @Body() data: any,
    @Request() req: RequestInterface,
  ): Promise<any> {
    console.log({ data }, 'submitting resume');

    const currentUser = req.user as any;
    const accountId = currentUser?.id;

    // create employer
    const employerData = {
      name: data.employerName,
      websiteUrl: data.employerWebsiteUrl,
      aboutUrl: data.employerAboutUrl,
      contactUrl: data.employerContactUrl,
      careersUrl: data.employerCareersUrl,
      glassDoorUrl: data.employerGlassDoorUrl,
    };
    console.log({ employerData }, 'creating employer');
    const createdEmployer = await this.employerService.create(employerData);
    console.log({ createdEmployer }, 'created employer');

    const jobPostingData = {
      url: data.jobPostingUrl,
      employerId: createdEmployer.id,
    };
    console.log({ jobPostingData }, 'creating job posting');
    const createdJobPosting = await this.jobPostingService.create(
      jobPostingData,
    );
    console.log({ createdJobPosting }, 'created job posting');

    console.log('creating resume');
    const resumeData = {
      accountId,
      jobPostingId: createdJobPosting.id,
      url: data.resumeUrl,
    };
    const createdResume = await this.resumeService.create(resumeData);
    console.log({ createdResume }, 'created resume');

    return { createdJobPosting, createdResume };
  }

  // @Get('resume/id/:id')
  // async fetchResumeById(@Param('id') id: string): Promise<ResumeModel | null> {
  //   console.log({ id }, 'fetching resume');
  //   const resumeRecord = await this.resumeService.fetchUnique({ id });
  //   console.log({ resumeRecord }, 'found resume record');
  //   return resumeRecord;
  // }

  // @Get('resume/for/:employer')
  // @UseGuards(JwtGuard)
  // async fetchResumeForEmployer(@Param('employer') employer: string) {
  //   console.log({ employer }, 'fetching resume');
  //   const resumeRecord = await this.resumeService.fetchByEmployer(employer);
  //   console.log({ resumeRecord }, 'found resume record');
  //   return resumeRecord ? resumeRecord : { message: 'Not Found' };
  // }

  // @Redirect()
  // @Get('redirect/:employer')
  // async redirectEmployerToResume(
  //   @Param('employer') employer: string,
  // ): Promise<any> {
  //   console.log({ employer }, 'fetching resume');
  //   const resumeRecord = await this.resumeService.fetchByEmployer(employer);

  //   if (!resumeRecord?.url) {
  //     return 'Not Found';
  //   }

  //   console.log({ url: resumeRecord.url }, 'redirecting...');
  //   return { url: resumeRecord.url, statusCode: HttpStatus.FOUND };
  // }
}
