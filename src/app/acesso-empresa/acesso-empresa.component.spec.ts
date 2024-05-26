import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoEmpresaComponent } from './acesso-empresa.component';

describe('AcessoEmpresaComponent', () => {
  let component: AcessoEmpresaComponent;
  let fixture: ComponentFixture<AcessoEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcessoEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
