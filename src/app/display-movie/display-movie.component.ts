import { Component, OnInit } from '@angular/core';
import {HttpMovieService} from "../Services/http-movie.service";
import {Movie} from "../Models/movie";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-display-movie',
  templateUrl: './display-movie.component.html',
  styleUrls: ['./display-movie.component.css']
})
export class DisplayMovieComponent implements OnInit {
  movies: Movie[] = [];
  private subscription = new Subscription();

  constructor(private http: HttpMovieService) { }

  ngOnInit(): void {
  }

  public id: number | null = null;

  get()
  {

    if(this.id == null)
    {
      const subscription = this.http.getAllMovies().subscribe(
        (data: Movie[]) => {
          this.movies = data;
        },
        error => {console.log(error)},
        () => console.log('Compleat getAll!')
      );
    }
    else if(this.id != null){
      const subscription = this.http.getMovie(this.id).subscribe(
        (data: Movie) => {
          this.movies = [];
          this.movies.push(data);
        },
        error => {console.log(error)},
        () => console.log('Compleat getId!')
      );
    }

  }

  delete(id: number | undefined, i: number)
  {
    if(id != undefined)
    {
      this.http.deleteMovie(id).subscribe(
        () => {
          this.http.getAllMovies().subscribe(
          (data: Movie[]) => {
            this.movies = data;
          }
        )} ,
        error => {console.log(error)},
        () => console.log('Compleat delete!')
      );
    }


  }

}
