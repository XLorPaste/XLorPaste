export interface Submission {
  timestamp: string;
  token: string;
  delete: string;
  lang: string;
  body: string;

  // for security
  pass?: string;
  once?: boolean;
}
