import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

type User = { _id?: string, Username?: string, Password?: string, Email?: string, FavoriteMovies?: [] }

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User = {};
  favoriteMovies: any[] = []

  @Input() userData = { Username: '', Password: '', Email: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.userData = {
      Username: user.Username || "",
      Email: user.Email || "",
      Password: "",
    };
    if (this.user && this.user.Username) {
      this.fetchFavoriteMovies();
    }
  }

  fetchFavoriteMovies(): void {
    const username = this.user?.Username;
  
    if (!username) {
      return; // Username is undefined, don't make the API call
    }
  
    this.fetchApiData.getFavoriteMovies(username).subscribe((movies) => {
      this.favoriteMovies = movies;
    });
  }
  

  deleteFavoriteMovie(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
      // Update the favoriteMovies array after successful deletion
      this.favoriteMovies = this.favoriteMovies.filter(movie => movie._id !== movieId);
      this.snackBar.open('Movie removed from favorites!', 'OK', {
        duration: 2000
      });
    });
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result))
      this.user = result;
      this.snackBar.open('User updated!', 'OK', {
        duration: 2000
      });
    });
  }
}
