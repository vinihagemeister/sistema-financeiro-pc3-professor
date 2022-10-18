import { tap } from 'rxjs/operators';
import { InterceptorSkipHeader } from './../../core/auth/request.interceptor';
import { Transacao } from './transacao.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of, map } from 'rxjs';



const API = environment.apiUrl;
const RECURSO = API+'/transacao'

const headers = new HttpHeaders().set(InterceptorSkipHeader, '');

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  selectAll(pagina: number = 0, limiteDeLinhas: number = 5, ordenacaoPelaColuna: string = '', ordenacaoAscOuDesc: string = ''){
    return this.httpClient.get<{content: Transacao[], totalElements: number, pageable: any, sort: any}>
    (
      RECURSO+`/selectAllComPaginacao?page=${pagina}&size=${limiteDeLinhas}`,
      {headers}
    );
  }

  selectAllComPaginacao(pagina: number = 0, limiteDeLinhas: number = 5, ordenacaoPelaColuna: string = '', ordenacaoAscOuDesc: string = ''){
    return this.httpClient.get<{items: Transacao[], count: number}>
    (
      RECURSO+`?page=${pagina+1}&limit=${limiteDeLinhas}&sortBy=${ordenacaoPelaColuna}&order=${ordenacaoAscOuDesc}`,
      {headers}
    );
  }

  selectAllByDescricao(pagina: number = 0, limiteDeLinhas: number = 5, descricao?: string){
    return this.httpClient.get<{items: Transacao[], count: number}>
    (
      RECURSO+`?page=${pagina+1}&limit=${limiteDeLinhas}&descricao=${descricao}`
    );
  }

  selectById(id: string){
    return this.httpClient.get<Transacao>(RECURSO+'/'+id);
  }

  insert(transacao: Transacao){
    return this.httpClient.post<Transacao>(RECURSO, transacao)
  }

  update(transacao: Transacao){
    return this.httpClient.put<Transacao>(RECURSO+'/'+transacao.id, transacao)
  }

  insertOrUpdate(transacao: Transacao){
    if(transacao && transacao.id){
      return this.update(transacao);
    }else{
      return this.insert(transacao);
    }

  }

  delete(id: number){
    return this.httpClient.delete<Transacao>(RECURSO+'/'+id);
  }

  selectLast(){
    return this.httpClient.get<{items: Transacao[], count: number}>
    (RECURSO).pipe(
      map(
        resposta=>{
          return resposta&&resposta.items&&resposta.items.length>0 ? resposta.items[resposta.items.length-1] : null
        }
      )
    )
  }

}
