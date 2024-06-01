import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SituacoesModalComponent } from './situacoes-modal.component';

describe('SituacoesModalComponent', () => {
  let component: SituacoesModalComponent;
  let fixture: ComponentFixture<SituacoesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SituacoesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SituacoesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
