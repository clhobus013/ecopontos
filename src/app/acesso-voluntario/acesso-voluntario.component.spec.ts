import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoVoluntarioComponent } from './acesso-voluntario.component';

describe('AcessoVoluntarioComponent', () => {
  let component: AcessoVoluntarioComponent;
  let fixture: ComponentFixture<AcessoVoluntarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcessoVoluntarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoVoluntarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
