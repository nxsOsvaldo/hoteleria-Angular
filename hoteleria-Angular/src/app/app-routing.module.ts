import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './constants/constants';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard],
    children:[
    { path: 'habitaciones', component: HabitacionesComponent,canActivate: [AuthGuard]},
    { path: 'usuarios', component: UsuariosComponent,canActivate: [AuthGuard], data: {roles: [Roles.ADMIN]}}
]},
  { path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
