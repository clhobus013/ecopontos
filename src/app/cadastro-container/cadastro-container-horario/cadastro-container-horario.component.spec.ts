import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroContainerHorarioComponent } from './cadastro-container-horario.component';

describe('CadastroContainerHorarioComponent', () => {
  let component: CadastroContainerHorarioComponent;
  let fixture: ComponentFixture<CadastroContainerHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroContainerHorarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroContainerHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
