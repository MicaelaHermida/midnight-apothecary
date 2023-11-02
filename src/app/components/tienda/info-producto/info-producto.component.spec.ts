import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductoComponent } from './info-producto.component';

describe('InfoProductoComponent', () => {
  let component: InfoProductoComponent;
  let fixture: ComponentFixture<InfoProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoProductoComponent]
    });
    fixture = TestBed.createComponent(InfoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
