export interface WorkRole {
  position: string;
  startDate: string;
  endDate: string;
}

export interface ClientExperience {
  client: string;
  position: string;
  startDate: string;
  endDate: string;
  highlights: string[];
}

export interface WorkExperience {
  id: number;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  relevant?: boolean;
  client?: string;
  clientExperience?: ClientExperience[];
  roles?: WorkRole[];
  highlights: string[];
}
