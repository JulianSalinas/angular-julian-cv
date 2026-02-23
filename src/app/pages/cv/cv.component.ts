import { Component, inject, computed, ChangeDetectionStrategy, signal } from '@angular/core';
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
  readonly showAllWorkExperience = signal(false);
  readonly expandedHighlights = signal<Set<string>>(new Set());
  curriculum = computed(
    () => this.curriculumDataService.getCurriculumData() as CurriculumData | null
  );
  isLoading = computed(() => this.curriculumDataService.getIsLoading());

  readonly personalInfo = computed(() => this.curriculum()?.personalInfo);
  readonly languages = computed(() => this.curriculum()?.languages);
  readonly technologies = computed(() => this.curriculum()?.technologies);
  readonly technologyGroups = computed(() => {
    const grouped = new Map<string, NonNullable<CurriculumData['technologies']>>();

    for (const technology of this.technologies() ?? []) {
      const category = technology.category;
      const categoryTechnologies = grouped.get(category);

      if (categoryTechnologies) {
        categoryTechnologies.push(technology);
      } else {
        grouped.set(category, [technology]);
      }
    }

    return Array.from(grouped.entries()).map(([category, technologies]) => ({
      category,
      technologies,
    }));
  });
  readonly skills = computed(() => this.curriculum()?.skills);
  readonly workExperience = computed(() => this.curriculum()?.workExperience);
  readonly visibleWorkExperience = computed(() => {
    const experience = this.workExperience() ?? [];
    if (this.showAllWorkExperience()) {
      return experience;
    }
    return experience.filter((job) => job.relevant !== false);
  });
  readonly hasMoreWorkExperience = computed(() =>
    (this.workExperience() ?? []).some((job) => job.relevant === false)
  );
  readonly education = computed(() => this.curriculum()?.education);
  readonly certifications = computed(() => this.curriculum()?.certifications);

  toggleWorkExperienceVisibility(): void {
    this.showAllWorkExperience.update((value) => !value);
  }

  isHighlightsExpanded(key: string): boolean {
    return this.expandedHighlights().has(key);
  }

  toggleHighlights(key: string): void {
    this.expandedHighlights.update((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  visibleHighlights(highlights: string[], key: string): string[] {
    if (highlights.length <= 4 || this.isHighlightsExpanded(key)) {
      return highlights;
    }
    return highlights.slice(0, 4);
  }
}
