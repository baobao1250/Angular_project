export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export interface TmdbResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}