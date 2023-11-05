import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarBrujasComponent } from './listar-brujas.component';

describe('ListarBrujasComponent', () => {
  let component: ListarBrujasComponent;
  let fixture: ComponentFixture<ListarBrujasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarBrujasComponent]
    });
    fixture = TestBed.createComponent(ListarBrujasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
