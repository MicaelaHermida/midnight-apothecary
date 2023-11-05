import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoInfoPageComponent } from './producto-info-page.component';

describe('ProductoInfoPageComponent', () => {
  let component: ProductoInfoPageComponent;
  let fixture: ComponentFixture<ProductoInfoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoInfoPageComponent]
    });
    fixture = TestBed.createComponent(ProductoInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
