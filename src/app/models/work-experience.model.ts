export interface WorkExperience {
  id: number;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  client?: string;
  highlights: string[];
}
