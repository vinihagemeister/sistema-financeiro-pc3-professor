import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeletarTransacaoComponent } from './dialog-deletar-transacao.component';

describe('DialogDeletarTransacaoComponent', () => {
  let component: DialogDeletarTransacaoComponent;
  let fixture: ComponentFixture<DialogDeletarTransacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeletarTransacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeletarTransacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
