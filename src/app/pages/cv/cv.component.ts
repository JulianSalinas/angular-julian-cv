import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurriculumDataService } from '../../services/curriculum-data.service';
import { CurriculumData } from '../../models/curriculum.model';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvComponent {
  private curriculumDataService = inject(CurriculumDataService);
  curriculum = computed(
    () => this.curriculumDataService.getCurriculumData() as CurriculumData | null
  );
  isLoading = computed(() => this.curriculumDataService.getIsLoading());

  readonly personalInfo = computed(() => this.curriculum()?.personalInfo);
  readonly languages = computed(() => this.curriculum()?.languages);
  readonly technologies = computed(() => this.curriculum()?.technologies);
  readonly skills = computed(() => this.curriculum()?.skills);
  readonly workExperience = computed(() => this.curriculum()?.workExperience);
  readonly education = computed(() => this.curriculum()?.education);
  readonly certifications = computed(() => this.curriculum()?.certifications);
}
