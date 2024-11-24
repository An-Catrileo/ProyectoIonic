import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./pages/login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'registrarse',
        loadChildren: () =>
          import('./pages/formulario/formulario.module').then(
            (m) => m.FormularioPageModule
          ),
      },
      {
        path: 'carrito',
        loadChildren: () =>
          import('./pages/carrito/carrito.module').then(
            (m) => m.CarritoPageModule
          ),
      },
      {
        path: 'categorias',
        loadChildren: () =>
          import('./pages/categorias/categorias.module').then(
            (m) => m.CategoriasPageModule
          ),
      },
      {
        path: 'detalle-juego/:id',
        loadChildren: () =>
          import('./pages/detalle-juego/detalle-juego.module').then(
            (m) => m.DetalleJuegoPageModule
          ),
      },
      {
        path: 'buscador',
        loadChildren: () =>
          import('./pages/buscador/buscador.module').then(
            (m) => m.BuscadorPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
