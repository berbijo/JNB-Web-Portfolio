import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';

export const routes: Routes = [
    {
        path: '',
        component: LandingPage
    },
    {
        path: 'projects/:id',
        loadComponent: () =>
        import('./pages/view-project/view-project')
        .then(m => m.ViewProject)
    },
    {
        path: 'resume',
        loadComponent: () =>
        import('./pages/resume-viewer/resume-viewer')
        .then(m => m.ResumeViewer)
    }
];
