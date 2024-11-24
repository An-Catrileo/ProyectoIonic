import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerestudiantesPage } from './verestudiantes.page';

describe('VerestudiantesPage', () => {
  let component: VerestudiantesPage;
  let fixture: ComponentFixture<VerestudiantesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerestudiantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
