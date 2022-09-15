import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { Pagina1Component } from './components/pagina1/pagina1.component';
import { Pagina2Component } from './components/pagina2/pagina2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'src/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { DialogInserirTransacaoComponent } from './components/dialog-inserir-transacao/dialog-inserir-transacao.component';
import { DialogDeletarTransacaoComponent } from './components/dialog-deletar-transacao/dialog-deletar-transacao.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    Pagina1Component,
    Pagina2Component,
    DialogInserirTransacaoComponent,
    DialogDeletarTransacaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,


    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,

    HttpClientModule,

    MaterialExampleModule,

    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
