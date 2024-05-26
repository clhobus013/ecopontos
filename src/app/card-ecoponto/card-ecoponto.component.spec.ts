import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEcopontoComponent } from './card-ecoponto.component';

describe('CardEcopontoComponent', () => {
  let component: CardEcopontoComponent;
  let fixture: ComponentFixture<CardEcopontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardEcopontoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEcopontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
