import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import {Movie, TmdbResponse } from '../../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  // Replace with your actual TMDB API Key
  private apiKey = 'da484c3e3ee2ba3dd0648a10060348b1'; 
  private baseUrl = 'https://api.themoviedb.org/3';

  // Search movies with a specific query
  searchMovies(query: string, page: number = 1): Observable<TmdbResponse> {
    if (!query.trim()) {
      // If empty query, return an empty observable stream safely
      return of({ page: 1, results: [], total_pages: 0 }); 
    }

    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`;
    
    return this.http.get<TmdbResponse>(url).pipe(
      catchError(err => {
        console.error('API Error:', err);
        // Fallback in case of error (prevents the app from crashing)
        return of({ page: 1, results: [], total_pages: 0 }); 
      })
    );
  }

  // Get details for a single movie
  getMovieDetails(id: string): Observable<Movie | null> {
    const url = `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`;
    
    return this.http.get<Movie>(url).pipe(
      catchError(() => of(null))
    );
  }
}