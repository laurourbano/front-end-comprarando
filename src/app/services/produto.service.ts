import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Produto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  urlApi: string = 'http://localhost:3000/api/produtos';
  constructor(
    private _http: HttpClient,
  ) { }

  // Get todos produtos
  getProdutos(): Observable<Produto[]> {
    return this._http.get<Produto[]>(`${this.urlApi}`);
  }
  // Get produto por id
  getProdutoById(id: number): Observable<Produto> {
    return this._http.get<Produto>(`${this.urlApi}/${id}`);
  }
  // Post produto
    postProduto(produto: Produto): Observable<Produto> {
      return this._http.post<Produto>(`${this.urlApi}`, produto);
    }
  // Put produto
  putProduto(id: number, produto: Produto): Observable<Produto> {
    return this._http.put<Produto>(`${this.urlApi}/${id}`, produto);
  }
  // Delete produto
  deleteProduto(id: number) {
    return this._http.delete(`${this.urlApi}/${id}`)
  }
}
