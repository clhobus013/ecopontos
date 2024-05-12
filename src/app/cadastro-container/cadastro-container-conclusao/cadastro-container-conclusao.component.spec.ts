import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroContainerConclusaoComponent } from './cadastro-container-conclusao.component';

describe('CadastroContainerConclusaoComponent', () => {
  let component: CadastroContainerConclusaoComponent;
  let fixture: ComponentFixture<CadastroContainerConclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroContainerConclusaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroContainerConclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
