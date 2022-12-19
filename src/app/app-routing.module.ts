import { ConfirmTicketAdminComponent } from './components/confirm-ticket-admin/confirm-ticket-admin.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { CinemaComponent } from './components/cinema/cinema.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { BlockedUserGuard } from 'src/services/auth/blocked-user.guard';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { AddMovieFormComponent } from './components/add-movie-form/add-movie-form.component';
import { BookingSeatComponent } from './components/booking-seat/booking-seat.component';
import { HomeComponent } from './components/home/home.component';
import { ListMovieComponent } from './components/list-movie/list-movie.component';
import { ListSearchComponent } from './components/list-search/list-search.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WrapperOutletComponent } from './components/wrapper-outlet/wrapper-outlet.component';
import { CinemaSeatComponent } from './components/cinema-seat/cinema-seat.component';
import { BookingListMovieComponent } from './booking-list-movie/booking-list-movie.component';
import { HistoryScoreComponent } from './components/history-score/history-score.component';
import { MovieDetailPageComponent } from './components/movie-detail-page/movie-detail-page.component';
import { ShowTimesComponent } from './components/show-times/show-times.component';
import { ConfirmTicketComponent } from './components/confirm-ticket/confirm-ticket.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { AddEmployeeFormComponent } from './components/add-employee-form/add-employee-form.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {path:'movie-detail',component:MovieDetailPageComponent},
  {path:'show-time',component:ShowTimesComponent},
  {
    path: 'admin',
    component: WrapperOutletComponent,
    canActivate:[BlockedUserGuard],
    // canActivate:[AuthGuard,BlockedUserGuard],
    children: [
      { path: 'movie', component: ListMovieComponent },
      { path: 'add', component: AddMovieFormComponent },
      {path:'booking-list',component:BookingListMovieComponent},
      {path:'cinema',component:CinemaComponent},
      {path:'cinema/seat',component:CinemaSeatComponent},
      {path:'employee',component:ListEmployeeComponent},
      {path:'employee/add',component:AddEmployeeFormComponent},
      {path:'employee/edit/:id',component:EditEmployeeComponent},
      {path:'booking-list/:id',component:ConfirmTicketAdminComponent}
    ],
  },
  { path: 'search', component: ListSearchComponent },
  { path: 'booking-seat', component: BookingSeatComponent,canActivate:[AuthGuard] },
  {path:'confirm-ticket',component:ConfirmTicketComponent,canActivate:[AuthGuard]},
  {
    path: 'user',
    component: UserProfileComponent,
    canActivate:[AuthGuard],
    children: [{ path: 'account-info', component: AccountInfoComponent },
    {path:'history',component:HistoryScoreComponent},{
      path:'booking-history',component:BookingHistoryComponent
    }],

  },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'notfound',component:NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
