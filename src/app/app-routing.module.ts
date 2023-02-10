import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from './services/auth.guard';
import { LoginCaptchatComponent } from './login-captchat/login-captchat.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { UpdateRolPermisosComponent } from './update-rol-permisos/update-rol-permisos.component';
import { AuthPermissionGuard } from './auth/auth-permission.guard';
const routes: Routes = 
[
  { path: "", redirectTo: "Inicio", pathMatch: "full" },
  { path: "Inicio",
    component: IndexComponent,
  },
  {
    //Url
    path: 'AddUser',
    //Componente al que dirigira la Url 
    component: AddUserComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Users"]}
  },
  {
    path: 'UsersList',
    component: UsersListComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Permiso, Prueba"]}
  },
  {
    path: 'ChangePassword',
    component: ChangePasswordComponent,
  },
  {
    path: 'UpdateUser',
    component: UpdateUserComponent,
    canActivate: [AuthPermissionGuard], data:{permiso: ["Prueba"]}
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'LoginCaptchat',
    component: LoginCaptchatComponent
  },
  {
    path: 'Recover',
    component: RecoverPasswordComponent,
  },
  {
    path: 'RolesList',
    component: RolesListComponent,
    canActivate: [AuthPermissionGuard], data:{permiso: ["Prueba"]}
  },
  {
    path: 'UpdateRolesPermisos',
    component: UpdateRolPermisosComponent,
    canActivate: [AuthPermissionGuard], data:{permiso: ["Prueba"]}
  },
  {
    path: "**",
    redirectTo: 'Login'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
