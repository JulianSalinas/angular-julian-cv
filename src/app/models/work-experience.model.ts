export interface WorkRole {
  position: string;
  startDate: string;
  endDate: string;
}

export interface WorkExperience {
  id: number;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  client?: string;
  roles?: WorkRole[];
  highlights: string[];
}
