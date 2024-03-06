import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarComprasComponent } from './buscar-compras.component';

describe('BuscarComprasComponent', () => {
  let component: BuscarComprasComponent;
  let fixture: ComponentFixture<BuscarComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarComprasComponent]
    });
    fixture = TestBed.createComponent(BuscarComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
