import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBrujaPageComponent } from './editar-bruja-page.component';

describe('EditarBrujaPageComponent', () => {
  let component: EditarBrujaPageComponent;
  let fixture: ComponentFixture<EditarBrujaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarBrujaPageComponent]
    });
    fixture = TestBed.createComponent(EditarBrujaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
