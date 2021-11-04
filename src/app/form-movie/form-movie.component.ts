import { Component, OnInit } from '@angular/core';
import {Movie} from "../Models/movie";
import {HttpMovieService} from "../Services/http-movie.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent implements OnInit {

  id: number | null = null;
  constructor(private http: HttpMovieService, private route: ActivatedRoute, private url:Router)
  {
    route.params.subscribe(
      (data) => {
        if(data.id)
        {
          this.id = Number(data.id);
        }
      },
      error => {console.log(error)},
      () => {}
    );
  }

  movie: Movie = new Movie();
  ngOnInit(): void {

    if(this.id)
    {
      this.http.getMovie(this.id).subscribe(
        (data: Movie) => {
          this.movie = data;
        },
        error => {console.log(error)},
        () => {}
      );
    }

  }
  choiceOptions()
  {

    if(this.id == null)
    {
      this.createMovie();
    }
    else
    {
      this.editMovie();
    }

    this.url.navigate(['/movies']);
  }

  createMovie()
  {
      this.http.postMovie(this.movie).subscribe(
        () => {},
        error => {console.log(error)},
        () => console.log('Compleat post!')
      );
  }

  editMovie()
  {

    this.http.putMovie(this.movie).subscribe(
      () => {},
      error => {console.log(error)},
      () => console.log('Compleat put!')
    );
  }
}
