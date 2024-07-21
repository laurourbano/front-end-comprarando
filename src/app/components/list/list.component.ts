import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Produto } from '../../interfaces/produto';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  produtos: Produto[] = [
    { id: '1', priceInCents: 100, name: 'Product 1', quantity: 1, total: 100 },
    { id: '2', priceInCents: 200, name: 'Product 2', quantity: 2, total: 400 },
    { id: '3', priceInCents: 300, name: 'Product 3', quantity: 3, total: 900 },
    { id: '4', priceInCents: 400, name: 'Product 4', quantity: 4, total: 1600 },
    { id: '5', priceInCents: 500, name: 'Product 5', quantity: 5, total: 2500 },
  ];
  displayedColumns: string[] = [
    'name',
    'priceInCents',
    'quantity',
    'total',
    'acoes',
  ];
  dataSource: MatTableDataSource<Produto>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private acRouter: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource<Produto>(this.produtos);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(id: string) {
    this.router.navigate(['produtos/editar', id]);
  }
  deletar() {
    return;
  }
}
