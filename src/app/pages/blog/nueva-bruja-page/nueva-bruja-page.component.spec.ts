import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaBrujaPageComponent } from './nueva-bruja-page.component';

describe('NuevaBrujaPageComponent', () => {
  let component: NuevaBrujaPageComponent;
  let fixture: ComponentFixture<NuevaBrujaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaBrujaPageComponent]
    });
    fixture = TestBed.createComponent(NuevaBrujaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
