import { Transacao } from '../../dominio/transacao/transacao.model';
import { TransacaoService } from 'src/app/dominio/transacao/transacao.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-deletar-transacao',
  templateUrl: './dialog-deletar-transacao.component.html',
  styleUrls: ['./dialog-deletar-transacao.component.scss']
})
export class DialogDeletarTransacaoComponent implements OnInit {

  transacao = {} as Transacao;

  constructor(
    public dialogRef: MatDialogRef<DialogDeletarTransacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transacaoService: TransacaoService,
  ) { }

  ngOnInit(): void {
    if(this.data && this.data.transacao){
      this.transacao = this.data.transacao;
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  deletar(){
    let that = this;

    this.transacaoService.delete(this.transacao.id as number).subscribe(
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

}
