import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  { path: 'produtos', component: ListComponent },
  { path: 'produtos/adicionar', component: FormComponent },
  { path: 'produtos/editar/:id', component: FormComponent },
  { path: '**', redirectTo: 'produtos' },
];
