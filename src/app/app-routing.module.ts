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
import { TrainingCenterCreateComponent } from './training-centers/training-center-create/training-center-create.component';
import { CampuesCreateComponent } from './campus/campues-create/campues-create.component';
import { DevelopmentRoomsCreateComponent } from './development-rooms/development-rooms-create/development-rooms-create.component';
import { BeneficiariesCreateComponent } from './beneficiaries/beneficiaries-create/beneficiaries-create.component';
import { TrainingCenterUpdateComponent } from './training-centers/training-center-update/training-center-update.component';
import { CampusUpdateComponent } from './campus/campus-update/campus-update.component';
import { DevelopmentRoomsUpdateComponent } from './development-rooms/development-rooms-update/development-rooms-update.component';
import { EducationalAgentsCreateComponent } from './educational-agents/educational-agents-create/educational-agents-create.component';
import { EducationalAgentsUpdateComponent } from './educational-agents/educational-agents-update/educational-agents-update.component';
import { HolidaysUpdateComponent } from './holidays/holidays-update/holidays-update.component';

const routes: Routes = 
[
  { path: "", redirectTo: "Inicio", pathMatch: "full" },
  { path: "Inicio", 
    component: IndexComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'Holidays',
    component: HolidaysComponent,
  },
  {
    path: 'HolidaysCreate',
    component: HolidaysCreateComponent,
  },
  {
    path: 'Holidays/HolidaysUpdate/:record',
    component: HolidaysUpdateComponent,
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
    path: 'TrainingCenters/TrainingCentersCreate',
    component: TrainingCenterCreateComponent,
  },
  {
    path: 'TrainingCenters/TrainingCentersUpdate/:record',
    component: TrainingCenterUpdateComponent
  },
  {
    path: 'Campus',
    component: CampusComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Sedes"]}
  },
  {
    path: 'Campus/CampusCreate',
    component: CampuesCreateComponent,
  },
  {
    path: 'Campus/CampusUpdate/:record',
    component: CampusUpdateComponent
  },
  {
    path: 'DevelopmentRooms',
    component: DevelopmentRoomsComponent,
  },{
    path: 'DevelopmentRooms/DevelopmentRoomsCreate',
    component: DevelopmentRoomsCreateComponent,
  },
  {
    path: 'DevelopmentRooms/DevelopmentRoomsUpdate/:record',
    component: DevelopmentRoomsUpdateComponent
  },
  {
    path: 'EducationalAgents',
    component: EducationalAgentsComponent,
  },
  {
    path: 'EducationalAgents/EducationalAgentsCreate',
    component: EducationalAgentsCreateComponent,
  },
  {
    path: 'EducationalAgents/EducationalAgentsUpdate/:recordRoom/:recordYear',
    component: EducationalAgentsUpdateComponent,
  },
  {
    path: 'Beneficiaries',
    component: BeneficiariesComponent,
  },
  {
    path: 'Beneficiaries/BeneficiariesCreate',
    component: BeneficiariesCreateComponent,
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
    //canActivate:[AuthPermissionGuard], data:{permiso: ["Users"]}
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
    //canActivate: [AuthPermissionGuard], data:{permiso: ["Prueba"]}
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
    //canActivate: [AuthPermissionGuard], data:{permiso: ["Prueba"]}
  },
  {
    path: 'UpdateRolesPermisos',
    component: UpdateRolPermisosComponent,
    //canActivate: [AuthPermissionGuard], data:{permiso: ["Prueba"]}
  },
  {
    path: "*",
    redirectTo: 'Login'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
