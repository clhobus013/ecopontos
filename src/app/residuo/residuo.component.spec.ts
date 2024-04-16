import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResiduoComponent } from './residuo.component';

describe('ResiduoComponent', () => {
  let component: ResiduoComponent;
  let fixture: ComponentFixture<ResiduoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResiduoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResiduoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
