import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurriculumData } from '../models/curriculum.model';

@Injectable({
  providedIn: 'root',
})
export class CurriculumDataService {
  private http = inject(HttpClient);
  private curriculumData = signal<CurriculumData | null>(null);
  private isLoading = signal(true);

  constructor() {
    this.loadCurriculumData();
  }

  private loadCurriculumData(): void {
    this.http.get<CurriculumData>('/assets/data/curriculum.json').subscribe({
      next: (data) => {
        console.log('Curriculum data loaded:', data);
        this.curriculumData.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading curriculum data:', error);
        this.isLoading.set(false);
      },
    });
  }

  getCurriculumData(): CurriculumData | null {
    return this.curriculumData();
  }

  getIsLoading(): boolean {
    return this.isLoading();
  }
}
