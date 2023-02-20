import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
//componentes de angular material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {matSnackBarAnimations, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
//aqui se importan los componentes creados
import { AddUserComponent } from './add-user/add-user.component'; 
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AuthGuard } from './services/auth.guard';
import { AuthPermissionGuard } from './auth/auth-permission.guard';
import { IndexComponent } from './index/index.component';
import { LoginCaptchatComponent } from './login-captchat/login-captchat.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { UpdateRolPermisosComponent } from './update-rol-permisos/update-rol-permisos.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { TrainingCentersComponent } from './training-centers/training-centers.component';
import { CampusComponent } from './campus/campus.component';
import { DevelopmentRoomsComponent } from './development-rooms/development-rooms.component';
import { EducationalAgentsComponent } from './educational-agents/educational-agents.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { PhotoAssignmentComponent } from './photo-assignment/photo-assignment.component';
import { BeneficiariesDevelopmentRoomsComponent } from './beneficiaries-development-rooms/beneficiaries-development-rooms.component';
import { ReportsComponent } from './reports/reports.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { HolidaysCreateComponent } from './holidays/holidays-create/holidays-create.component';
import { TrainingCenterCreateComponent } from './training-centers/training-center-create/training-center-create.component';
import { CampuesCreateComponent } from './campus/campues-create/campues-create.component';
import { DevelopmentRoomsCreateComponent } from './development-rooms/development-rooms-create/development-rooms-create.component';
import { BeneficiariesCreateComponent } from './beneficiaries/beneficiaries-create/beneficiaries-create.component';
import { TrainingCenterUpdateComponent } from './training-centers/training-center-update/training-center-update.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ChangePasswordComponent,
    LoginComponent,
    RecoverPasswordComponent,
    UpdateUserComponent,
    IndexComponent,
    LoginCaptchatComponent,
    UsersListComponent,
    RolesListComponent,
    UpdateRolPermisosComponent,
    HolidaysComponent,
    TrainingCentersComponent,
    CampusComponent,
    DevelopmentRoomsComponent,
    EducationalAgentsComponent,
    BeneficiariesComponent,
    PhotoAssignmentComponent,
    BeneficiariesDevelopmentRoomsComponent,
    ReportsComponent,
    IntegrationsComponent,
    HolidaysCreateComponent,
    TrainingCenterCreateComponent,
    CampuesCreateComponent,
    DevelopmentRoomsCreateComponent,
    BeneficiariesCreateComponent,
    TrainingCenterUpdateComponent
    //aqui se adicionan los componentes creados  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    RecaptchaModule
  ],
  providers: [CookieService, 
    AuthGuard,
    AuthPermissionGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
],
  bootstrap: [AppComponent]
})
export class AppModule { }