export interface Payload {
  timestamp: string;
  lang: string;
  body: string;

  pass?: string;
  once?: boolean;
}

export interface UploadResponse {
  timestamp: string;
  token: string;
  delete: string;

  once?: boolean;
}

export interface Submission {
  timestamp: string;
  token: string;
  delete: string;
  lang: string;
  body: string;

  // for security
  pass?: string;
  once?: boolean;
  author?: {
    ip: string | undefined | null;
    country: string | undefined | null;
    region: string | undefined | null;
    city: string | undefined | null;
    latitude: string | undefined | null;
    longitude: string | undefined | null;
  };
}

export interface FetchSubmission {
  timestamp: string;
  token: string;
  lang: string;
  body: string;
}

export interface FetchError {
  status: string;
  message?: string;
}
