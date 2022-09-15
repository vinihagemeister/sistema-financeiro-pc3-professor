import { DialogDeletarTransacaoComponent } from './../dialog-deletar-transacao/dialog-deletar-transacao.component';
import { DialogInserirTransacaoComponent } from './../dialog-inserir-transacao/dialog-inserir-transacao.component';
import { Transacao } from './../../dominio/transacao/transacao.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TransacaoService } from 'src/app/dominio/transacao/transacao.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss']
})
export class PaginaPrincipalComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'descricao', 'createdAt', 'tipo', 'valor', 'saldo', 'acoes'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  transacoes: any = [];
  dataSource: MatTableDataSource<Transacao> = new MatTableDataSource(this.transacoes);
  // transacoesDados: any = [];

  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private transacaoService: TransacaoService,
    public dialog: MatDialog
    ) {
     }


  ngOnInit() {
   this.buscaListaDeTransacoes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as MatPaginator;
    this.dataSource.sort = this.sort as MatSort;
  }

  navegarPara(rota: any[]){
    this.router.navigate(rota);
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.transacoes.filter = filterValue.trim().toLowerCase();
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();

    let that = this;

    this.transacaoService.selectAllByDescricao(this.currentPage, this.pageSize, filterValue).subscribe(
      {
        next(resposta){
            // that.dataSource.paginator.firstPage();
            that.paginator.pageIndex = that.currentPage;
            that.paginator.length = resposta.count;
            that.dataSource = new MatTableDataSource(resposta.items);
        },
        error(err){
          console.error(err);
        },
        complete(){
          console.log("requisição completa");
        }
      }
    )


  }

  getDateBr(isoDate: string){
    return new Date(isoDate).toLocaleDateString('pt-br')
  }

  openDialogInserirEditarTransacao(transacao?: Transacao){
    const dialogRef = this.dialog.open(DialogInserirTransacaoComponent, {
      width: '1000px',
      data: { transacao },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.buscaListaDeTransacoes();
    });
  }



  deletar(obj: Transacao){
    this.openDialogDeletarTransacao(obj);
  }

  openDialogDeletarTransacao(transacao: Transacao){
    const dialogRef = this.dialog.open(DialogDeletarTransacaoComponent, {
      width: '500px',
      data: { transacao },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.buscaListaDeTransacoes();
    });
  }

  buscaListaDeTransacoes() {
    this.isLoading = true;

    let that = this;

    this.transacaoService.selectAll(this.currentPage, this.pageSize).subscribe(
      {
        next(resposta){
          // that.transacoes = resposta.items;
          that.paginator.pageIndex = that.currentPage;
          that.paginator.length = resposta.count;

          that.populaDataSource(resposta.items);



        },
        error(err){
          console.error(err);
        },
        complete(){
          console.log("requisição completa");
          that.isLoading = false;
        }
      }
    );
  }

  populaDataSource(transacoes: Transacao[]){
    this.dataSource = new MatTableDataSource(transacoes);
    this.ngAfterViewInit();
  }

  pageChanged(event: PageEvent) {
    // console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.buscaListaDeTransacoes();
  }


}
