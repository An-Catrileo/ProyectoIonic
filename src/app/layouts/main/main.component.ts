import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiciodbService } from '../../services/database.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  
  private authSubscription!: Subscription;

  constructor(private dbService: ServiciodbService, private router: Router) {}

  ngOnInit() {
    // Suscribirse al observable de autenticación para actualizar el estado automáticamente
    this.authSubscription = this.dbService.isAuthenticatedObservable().subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
      const user = this.dbService.getCurrentUser();
      this.isAdmin = user ? user.role === 'admin' : false;
    });
  }

  logout() {
    // Llama al servicio para cerrar sesión y redirige al login
    this.dbService.logoutUser();
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    // Desuscribirse del observable para evitar pérdidas de memoria
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
