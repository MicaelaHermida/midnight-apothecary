import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBrujaComponent } from './editar-bruja.component';

describe('EditarBrujaComponent', () => {
  let component: EditarBrujaComponent;
  let fixture: ComponentFixture<EditarBrujaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarBrujaComponent]
    });
    fixture = TestBed.createComponent(EditarBrujaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
