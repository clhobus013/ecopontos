import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroContainerEcopontoComponent } from './cadastro-container-ecoponto.component';

describe('CadastroContainerEcopontoComponent', () => {
  let component: CadastroContainerEcopontoComponent;
  let fixture: ComponentFixture<CadastroContainerEcopontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroContainerEcopontoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroContainerEcopontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
