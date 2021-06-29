import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './_helpers/auth.guard';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },
  {
    path: '', component: AdminLayoutComponent,
    children: [
      { path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule', canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
]
