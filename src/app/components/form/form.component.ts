import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto } from '../../interfaces/produto';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  form: FormGroup;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private acRouter: ActivatedRoute,
    private toastr: ToastrService,
    private produtoService: ProdutoService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      priceInCents: [null, Validators.required],
      quantity: [null, Validators.required],
      total: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.acRouter.params.subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        this.produtoService.getProdutoById(id).subscribe({
          next: (produto: Produto) => {
              this.form.setValue({
                name: produto.name,
                priceInCents: produto.priceInCents,
                quantity: produto.quantity,
                total: produto.total
              });
          },
          error: (error) => {
            this.toastr.error('Erro ao carregar o produto.');
            console.error(error);
          }
        });
      }
    });
  }


  salvar() {
    this.id = Number(this.acRouter.params);
    if (this.id === 0) {
      this.adicionarProduto();
      this.limparFormulario();
    } else {
      const produto = this.form.value;
      this.atualizarProduto(this.id, produto);
      this.limparFormulario();
    }
  }

  adicionarProduto() {
    const produto = this.form.value;
    this.produtoService.postProduto(produto).subscribe({
      next: () => {
        this.toastr.success('Produto adicionado com sucesso!');
        this.router.navigate(['produtos']);
      },
      error: (error) => {
        this.toastr.error('Erro ao adicionar o produto.');
        console.error(error);
      }
    });
  }

  atualizarProduto(id: number, produto: Produto) {
    this.produtoService.putProduto(id, produto).subscribe({
      next: () => {
        this.toastr.success('Produto atualizado com sucesso!');
        this.router.navigate(['produtos']);
      },
      error: (error) => {
        this.toastr.error('Erro ao atualizar o produto.');
        console.error(error);
      }
    });
  }

  limparFormulario() {
    this.form.reset();
    this.router.navigate(['produtos']);
  }
}
