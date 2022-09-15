import { Transacao } from './../../dominio/transacao/transacao.model';
import { TransacaoService } from 'src/app/dominio/transacao/transacao.service';
import { ETipoTransacao } from './../../dominio/transacao/etipotransacao/etipotransacao.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-inserir-transacao',
  templateUrl: './dialog-inserir-transacao.component.html',
  styleUrls: ['./dialog-inserir-transacao.component.scss']
})
export class DialogInserirTransacaoComponent implements OnInit {

  transacao = {} as Transacao;

  id: number = 0;
  ativo: boolean = true;

  descricaoInput: string = '';
  valorInput: number = 0;
  tipoInput: string = '';
  //'ENTRADA' ou 'SAIDA'

  constructor(
    public dialogRef: MatDialogRef<DialogInserirTransacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transacaoService: TransacaoService,
  ) { }

  ngOnInit(): void {

    if(this.data && this.data.transacao){
      console.log(this.data.transacao);
      this.modelToForm(this.data.transacao);
    }


  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    let transacaoObj = this.formToModel();

    let that = this;

    this.transacaoService.insertOrUpdate(transacaoObj).subscribe(
      {
        next(transacao){
          that.dialogRef.close(transacao);
        },
        error(err){
          console.error(err);
        },
        complete(){
          console.log("requisição completa");
        }
      }
    );
  }

  formToModel(): Transacao{

    // let transacaoParaSalvar = {
    //   descricao: this.descricaoInput,
    //   valor: this.valorInput,
    //   tipo: this.tipoInput
    // } as Transacao;

    this.transacao.descricao = this.descricaoInput;
    this.transacao.valor = this.valorInput;
    this.transacao.tipo = this.tipoInput;

    return this.transacao;
  }

  modelToForm(transacao: Transacao){
    this.transacao = transacao;

    this.id = transacao.id;
    this.ativo = transacao.ativo;
    this.descricaoInput = transacao.descricao;
    this.valorInput = transacao.valor;
    this.tipoInput = transacao.tipo;
  }

}
