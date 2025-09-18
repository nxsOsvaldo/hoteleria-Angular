import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './constants/constants';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { HuespedesComponent } from './components/huespedes/huespedes.component';
import { ReservasComponent } from './components/reservas/reservas.component';

/* const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard],
    children:[
    { path: 'habitaciones', component: HabitacionesComponent,canActivate: [AuthGuard]},
    { path: 'usuarios', component: UsuariosComponent,canActivate: [AuthGuard], data: {roles: [Roles.ADMIN]}}
]},
  { path: '**', redirectTo: 'dashboard'}
]; */

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // acceso directo sin login
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'habitaciones', component: HabitacionesComponent },
      { path: 'huespedes', component: HuespedesComponent },
      { path: 'reservas', component: ReservasComponent },
      { path: 'usuarios', component: UsuariosComponent }
    ]
  },

  // acceso directo a componentes individuales (opcional)
  { path: 'habitaciones', component: HabitacionesComponent },
  { path: 'huespedes', component: HuespedesComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'usuarios', component: UsuariosComponent },

  { path: '**', redirectTo: 'dashboard' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
