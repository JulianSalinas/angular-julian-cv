import { PersonalInfo } from './personal-info.model';
import { Language } from './language.model';
import { Technology } from './technology.model';
import { WorkExperience } from './work-experience.model';
import { Education } from './education.model';
import { Certification } from './certification.model';

export interface CurriculumData {
  personalInfo: PersonalInfo;
  languages: Language[];
  technologies: Technology[];
  skills: string[];
  workExperience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
}

// Re-export all models for convenience
export type { PersonalInfo, Language, Technology, WorkExperience, Education, Certification };
