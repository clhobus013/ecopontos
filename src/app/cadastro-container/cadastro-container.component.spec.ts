import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroContainerComponent } from './cadastro-container.component';

describe('CadastroContainerComponent', () => {
  let component: CadastroContainerComponent;
  let fixture: ComponentFixture<CadastroContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
