import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProductoPageComponent } from './nuevo-producto-page.component';

describe('NuevoProductoPageComponent', () => {
  let component: NuevoProductoPageComponent;
  let fixture: ComponentFixture<NuevoProductoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoProductoPageComponent]
    });
    fixture = TestBed.createComponent(NuevoProductoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
