import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcopontoComponent } from './ecoponto.component';

describe('EcopontoComponent', () => {
  let component: EcopontoComponent;
  let fixture: ComponentFixture<EcopontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcopontoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcopontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
