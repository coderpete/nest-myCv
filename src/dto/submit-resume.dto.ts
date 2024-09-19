export class SubmitResumeDto {
  accountId?: string;

  // JobPosting
  jobPostingUrl: string;

  // Resume
  resumeUrl: string;

  // Employer
  employerName: string;
  employerWebsiteUrl?: string;
  employerAboutUrl?: string;
  employerContactUrl?: string;
  employerCareersUrl?: string;
  employerGlassDoorUrl?: string;
}
