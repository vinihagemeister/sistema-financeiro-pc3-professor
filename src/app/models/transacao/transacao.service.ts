import { Transacao } from './transacao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiUrl;
const RECURSO = API+'/transacao'

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  constructor(
    private httpClient: HttpClient
  ) { }


  selectAll(){
    return this.httpClient.get<Transacao[]>(RECURSO);
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
  isertOrUpdate(transacao: Transacao){
    if(transacao && transacao.id){
      return this.update(transacao);
    }else{
      return this.insert(transacao);
    }

  }
  delete(id: number){
    return this.httpClient.delete<Transacao>(RECURSO+'/'+id);
  }

  }
