import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DisplayMovieComponent} from "./display-movie/display-movie.component";
import {FormMovieComponent} from "./form-movie/form-movie.component";

const  routes: Routes = [
  { path: '', component: DisplayMovieComponent  },
  { path: 'movies', redirectTo: '', pathMatch: 'full' },
  { path: 'movies/form', component: FormMovieComponent },
  { path: 'movies/form/:id', component: FormMovieComponent },
  { path: '**', redirectTo: '/movies' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
