import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/kanban-board',
    pathMatch: 'full'
  },
  {
    path: 'kanban-board',
    component: BoardComponent,
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
