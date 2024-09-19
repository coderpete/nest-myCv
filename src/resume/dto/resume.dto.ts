export class ResumeCreateDto {
  id?: string; // should be an auto-generated uuid
  accountId?: string; // should come from the jwt token
  jobPostingId: string;
  url: string;
}
