import { Component, signal } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { EXPERIENCE }         from '../../constants/portfolio.constants';

export type ExperienceTab = 'work' | 'education' | 'awards' | 'technologies';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  exp = EXPERIENCE;

  tabs: { id: ExperienceTab; label: string }[] = [
    { id: 'work',         label: 'Work' },
    { id: 'education',    label: 'Education' },
    { id: 'awards',       label: 'Awards and Certifications' },
    { id: 'technologies', label: 'Languages & Technologies' },
  ];

  activeTab = signal<ExperienceTab>('work');

  setTab(id: ExperienceTab) {
    this.activeTab.set(id);
  }
}