import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap, filter, startWith } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../../shared/services/movieServices/movie';
import { Movie } from '../../../shared/models/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {
  movieService = inject(MovieService);
  
  searchControl = new FormControl('');
  movies = signal<Movie[]>([]);
  isLoading = signal(false);

  ngOnInit() {
    // Advanced RxJS Pipeline for Smart Searching
    this.searchControl.valueChanges.pipe(
      startWith(''),
      // 1. Wait 500ms after the user stops typing
      debounceTime(500),
      // 2. Only proceed if the new value is different from the last one
      distinctUntilChanged(),
      // 3. Set loading state to true
      tap(() => this.isLoading.set(true)),
      // 4. Cancel the previous API request if a new one starts (switchMap magic!)
      switchMap(query => this.movieService.searchMovies(query || ''))
    ).subscribe({
      next: (response) => {
        this.movies.set(response.results);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }
}