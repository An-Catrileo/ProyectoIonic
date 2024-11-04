import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'carrito',
        loadChildren: () => import('./carrito/carrito.module').then(m => m.CarritoPageModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasPageModule)
      },
      {
        path: 'detalle-juego/:id',
        loadChildren: () => import('./detalle-juego/detalle-juego.module').then(m => m.DetalleJuegoPageModule)
      },
      {
        path: 'buscador',
        loadChildren: () => import('./buscador/buscador.module').then(m => m.BuscadorPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
