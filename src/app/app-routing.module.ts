import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users-list/add-user/add-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { UpdateUserComponent } from './users-list/update-user/update-user.component';
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
import { PhotoUploadComponent } from './photo-assignment/photo-upload/photo-upload.component';
import { BeneficiariesUpdateComponent } from './beneficiaries/beneficiaries-update/beneficiaries-update.component';
import { BeneficiariesDevelopmentRoomsUpdateComponent } from './beneficiaries-development-rooms/beneficiaries-development-rooms-update/beneficiaries-development-rooms-update.component';

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
    canActivate:[AuthPermissionGuard], data:{permiso: ["Configuración de días laborales y festivos"]}
  },
  {
    path: 'HolidaysCreate',
    component: HolidaysCreateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Configuración de días laborales y festivos"]}
  },
  {
    path: 'Holidays/HolidaysUpdate/:record',
    component: HolidaysUpdateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Configuración de días laborales y festivos"]}
  },
  {
    path: 'Integrations',
    component: IntegrationsComponent,
  },
  {
    path: 'TrainingCenters',
    component: TrainingCentersComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Centros de formación"]}
  },
  {
    path: 'TrainingCenters/TrainingCentersCreate',
    component: TrainingCenterCreateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Centros de formación"]}
  },
  {
    path: 'TrainingCenters/TrainingCentersUpdate/:record',
    component: TrainingCenterUpdateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Centros de formación"]}
  },
  {
    path: 'Campus',
    component: CampusComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Sedes"]}
  },
  {
    path: 'Campus/CampusCreate',
    component: CampuesCreateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Sedes"]}
  },
  {
    path: 'Campus/CampusUpdate/:record',
    component: CampusUpdateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Sedes"]}
  },
  {
    path: 'DevelopmentRooms',
    component: DevelopmentRoomsComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Salas de desarrollo"]}
  },{
    path: 'DevelopmentRooms/DevelopmentRoomsCreate',
    component: DevelopmentRoomsCreateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Salas de desarrollo"]}
  },
  {
    path: 'DevelopmentRooms/DevelopmentRoomsUpdate/:record',
    component: DevelopmentRoomsUpdateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Salas de desarrollo"]}
  },
  {
    path: 'EducationalAgents',
    component: EducationalAgentsComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Asignación agentes educativos"]}
  },
  {
    path: 'EducationalAgents/EducationalAgentsCreate',
    component: EducationalAgentsCreateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Asignación agentes educativos"]}
  },
  {
    path: 'EducationalAgents/EducationalAgentsUpdate/:recordRoom/:recordYear',
    component: EducationalAgentsUpdateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Asignación agentes educativos"]}
  },
  {
    path: 'Beneficiaries',
    component: BeneficiariesComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Gestión niños y niñas"]}
  },
  {
    path: 'Beneficiaries/BeneficiariesCreate',
    component: BeneficiariesCreateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Gestión niños y niñas"]}
  },
  {
    path: 'Beneficiaries/BeneficiariesUpdate/:record',
    component: BeneficiariesUpdateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Gestión niños y niñas"]}
  },
  {
    path: 'PhotoAssignment',
    component: PhotoAssignmentComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Asignación de fotos"]}
  },
  {
    path: 'PhotoAssignment/PhotoUpload/:record',
    component: PhotoUploadComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Asignación de fotos"]}
  },
  {
    path: 'BeneficiariesDevelopmentRooms',
    component: BeneficiariesDevelopmentRoomsComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Asignación salas a niños y niñas"]}
  },
  {
    path: 'BeneficiariesDevelopmentRooms/BeneficiariesDevelopmentRoomsUpdate/:record',
    component: BeneficiariesDevelopmentRoomsUpdateComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Asignación salas a niños y niñas"]}
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
    canActivate:[AuthPermissionGuard], data:{permiso: ["Usuarios"]}
  },
  {
    path: 'UsersList',
    component: UsersListComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Usuarios"]}
  },
  {
    path: 'ChangePassword',
    component: ChangePasswordComponent,
  },
  {
    path: 'UpdateUser',
    component: UpdateUserComponent,
    canActivate:[AuthPermissionGuard], data:{permiso: ["Usuarios"]}
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
    path: "*",
    redirectTo: 'Login'
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
