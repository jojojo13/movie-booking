import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { AddMovieFormComponent } from './components/add-movie-form/add-movie-form.component';
import { BookingSeatComponent } from './components/booking-seat/booking-seat.component';
import { HomeComponent } from './components/home/home.component';
import { ListMovieComponent } from './components/list-movie/list-movie.component';
import { ListSearchComponent } from './components/list-search/list-search.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WrapperOutletComponent } from './components/wrapper-outlet/wrapper-outlet.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: WrapperOutletComponent,
    children: [
      { path: 'movie', component: ListMovieComponent },
      { path: 'add', component: AddMovieFormComponent },
    ],
  },
  { path: 'search', component: ListSearchComponent },
  { path: 'booking-seat', component: BookingSeatComponent },
  {
    path: 'user',
    component: UserProfileComponent,
    children: [{ path: 'account-info', component: AccountInfoComponent }],
  },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
