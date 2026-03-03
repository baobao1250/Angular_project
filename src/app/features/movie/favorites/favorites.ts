import { Component, inject, signal, OnInit } from '@angular/core';
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
export class FavoritesComponent implements OnInit {
  private favoriteService = inject(FavoriteService);
  private movieService = inject(MovieService);

  favoriteMovies = signal<Movie[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const ids = this.favoriteService.favoriteIds();
    
    if (ids.length === 0) {
      this.isLoading.set(false);
      return;
    }

    // 1. Tạo ra một mảng các API Request (Mỗi Request đi tìm 1 phim)
    // Lọc những giá trị null ra khỏi mảng đề phòng API bị lỗi 
    const requests = ids.map(id => this.movieService.getMovieDetails(id.toString()));

    // 2. Dùng forkJoin để bắn TẤT CẢ request cùng một lúc
    // forkJoin sẽ gom tất cả kết quả lại thành 1 mảng duy nhất khi tất cả hoàn thành.
    forkJoin(requests).subscribe(results => {
      // Loại bỏ những phim bị null (do lỗi mạng hoặc phim đã bị xóa khỏi TMDB)
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