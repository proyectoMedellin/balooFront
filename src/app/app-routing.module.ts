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
import { HolidaysComponent } from './holidays/holidays.component';
import { HolidaysCreateComponent } from './holidays/holidays-create/holidays-create.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { TrainingCentersComponent } from './training-centers/training-centers.component';
import { CampusComponent } from './campus/campus.component';
import { DevelopmentRoomsComponent } from './development-rooms/development-rooms.component';
import { EducationalAgentsComponent } from './educational-agents/educational-agents.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { PhotoAssignmentComponent } from './photo-assignment/photo-assignment.component';
import { BeneficiariesDevelopmentRoomsComponent } from './beneficiaries-development-rooms/beneficiaries-development-rooms.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = 
[
  { path: "", redirectTo: "LoginCaptchat", pathMatch: "full" },
  { path: "Inicio", component: IndexComponent, },
  {
    path: 'Holidays',
    component: HolidaysComponent,
  },
  {
    path: 'HolidaysCreate',
    component: HolidaysCreateComponent,
  },
  {
    path: 'Integrations',
    component: IntegrationsComponent,
  },
  {
    path: 'TrainingCenters',
    component: TrainingCentersComponent,
  },
  {
    path: 'Campus',
    component: CampusComponent,
  },
  {
    path: 'DevelopmentRooms',
    component: DevelopmentRoomsComponent,
  },
  {
    path: 'EducationalAgents',
    component: EducationalAgentsComponent,
  },
  {
    path: 'Beneficiaries',
    component: BeneficiariesComponent,
  },
  {
    path: 'PhotoAssignment',
    component: PhotoAssignmentComponent,
  },
  {
    path: 'BeneficiariesDevelopmentRooms',
    component: BeneficiariesDevelopmentRoomsComponent,
  },
  {
    path: 'Reports',
    component: ReportsComponent,
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
    /*canActivate:[AuthPermissionGuard], data:{permiso: ["Permiso, Prueba"]}*/
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
    path: "*",
    redirectTo: 'LoginCaptchat'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
