import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroContainerEmpresaComponent } from './cadastro-container-empresa.component';

describe('CadastroContainerEmpresaComponent', () => {
  let component: CadastroContainerEmpresaComponent;
  let fixture: ComponentFixture<CadastroContainerEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroContainerEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroContainerEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
