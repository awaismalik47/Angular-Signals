import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
    {path:'',component:AdminComponent},
    { path: 'dashboard', component: DashboardComponent },
    {path:'user',component:UserComponent},
    {path:'admin',component:AdminComponent}
];
