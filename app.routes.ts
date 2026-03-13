import { Routes } from '@angular/router';
import { Login } from './components/login/login'; 
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { AdminPanelComponent } from './components/admin-panel/admin-panel';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
