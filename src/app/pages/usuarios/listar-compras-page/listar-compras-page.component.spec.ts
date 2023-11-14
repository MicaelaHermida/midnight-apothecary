import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComprasPageComponent } from './listar-compras-page.component';

describe('ListarComprasPageComponent', () => {
  let component: ListarComprasPageComponent;
  let fixture: ComponentFixture<ListarComprasPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarComprasPageComponent]
    });
    fixture = TestBed.createComponent(ListarComprasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
