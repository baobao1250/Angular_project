import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../../shared/services/movieServices/favorite';
import { MovieService } from '../../../shared/services/movieServices/movie';
import { Movie } from '../../../shared/models/movie';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./favorites.html"
})
export class FavoritesComponent {
  private favoriteService = inject(FavoriteService);
  private movieService = inject(MovieService);

  favoriteMovies = signal<Movie[]>([]);
  isLoading = signal(true);

  constructor() {
    // Dùng effect để LẮNG NGHE khi nào cái cờ isLoaded bật thành true thì mới load phim
    effect(() => {
      if (this.favoriteService.isLoaded()) {
         this.loadFavorites();
      }
    });
  }

  loadFavorites() {
    const ids = this.favoriteService.favoriteIds();
    
    if (ids.length === 0) {
      this.isLoading.set(false);
      return;
    }

    const requests = ids.map(id => this.movieService.getMovieDetails(id.toString()));

    forkJoin(requests).subscribe(results => {
      const validMovies = results.filter((m): m is Movie => m !== null);
      this.favoriteMovies.set(validMovies);
      this.isLoading.set(false);
    });
  }

  removeFavorite(id: number) {
    this.favoriteService.toggleFavorite(id);
    // Cập nhật lại UI lập tức bằng cách loại bỏ phim đó khỏi mảng hiện tại
    this.favoriteMovies.update(movies => movies.filter(m => m.id !== id));
  }
}