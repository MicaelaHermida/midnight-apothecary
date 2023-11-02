import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaBrujaComponent } from './nueva-bruja.component';

describe('NuevaBrujaComponent', () => {
  let component: NuevaBrujaComponent;
  let fixture: ComponentFixture<NuevaBrujaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaBrujaComponent]
    });
    fixture = TestBed.createComponent(NuevaBrujaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
