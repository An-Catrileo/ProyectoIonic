import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServiciodbService } from 'src/app/services/database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private databaseService: ServiciodbService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.databaseService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
