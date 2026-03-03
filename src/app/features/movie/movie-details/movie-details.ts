import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../../shared/services/movieServices/movie';
import { Movie } from '../../../shared/models/movie';
import { FavoriteService } from '../../../shared/services/movieServices/favorite';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [RouterLink , DatePipe],
  templateUrl: './movie-details.html'
})
export class MovieDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute); 
  private movieService = inject(MovieService);
  private favoriteService = inject(FavoriteService); // Inject Service

  movie = signal<Movie | null>(null);
  isLoading = signal(true);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      if (id) {
        this.fetchDetails(id);
      } else {
        this.isLoading.set(false);
      }
    });
  }

  fetchDetails(id: string) {
    this.isLoading.set(true);
    this.movieService.getMovieDetails(id).subscribe(data => {
      this.movie.set(data);
      this.isLoading.set(false);
    });
  }

  // --- Chức năng Yêu thích ---
  toggleFavorite(id: number) {
    this.favoriteService.toggleFavorite(id);
  }

  isFav(id: number): boolean {
    return this.favoriteService.isFavorite(id);
  }
}