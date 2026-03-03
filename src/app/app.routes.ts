import { ExerciseFour } from './features/exercise-four/exercise-four';
import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth';
export const routes: Routes = [
    {
        path: 'bai-1',
        // Dùng loadComponent và import() dạng Promise. 
        // Trình duyệt sẽ tách file exercise-one ra thành 1 cục JS riêng biệt!
        loadComponent: () => import('./features/exercise-one/exercise-one').then(m => m.ExerciseOne)
    },
    {
        path: 'bai-2',
        loadComponent: () => import('./features/exercise-two/exercise-two').then(m => m.ExerciseTwo)
    },
    {
        path: 'bai-3',
        loadComponent: () => import('./features/exercise-three/exercise-three').then(m => m.ExerciseThree),
        canActivate: [authGuard]
    },
    {
        path: 'bai-4',
        loadComponent: () => import('./features/exercise-four/exercise-four').then(m => m.ExerciseFour),
        canActivate: [authGuard]
    },
    {
        path: 'bai-5',
        loadComponent: () => import('./features/exercise-five/exercise-five').then(m => m.ExerciseFive),
        canActivate: [authGuard]
    },
    {
        path: 'bai-6',
        loadComponent: () => import('./features/exercise-six/exercise-six').then(m => m.ExerciseSix),
        canActivate: [authGuard]
    },

    {
        path: 'movies',
        loadComponent: () => import('./features/movie/home/home').then(m => m.HomeComponent)
    },
    {
        // The colon ':' defines a dynamic parameter named 'id'
        path: 'movie/:id',
        loadComponent: () => import('./features/movie/movie-details/movie-details').then(m => m.MovieDetailsComponent)
    },
    {
        path: 'favorites',
        loadComponent: () => import('./features/movie/favorites/favorites').then(m => m.FavoritesComponent),
        // You can attach your authGuard here from Level 1!
        // canActivate: [authGuard] 
    },

    {
        path: 'login',
        loadComponent: () => import('./features/login/login').then(m => m.Login)
    },

    { path: '', redirectTo: 'bai-1', pathMatch: 'full' }
];