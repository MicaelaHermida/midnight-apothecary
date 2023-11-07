import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComentariosComponent } from './listar-comentarios.component';

describe('ListarComentariosComponent', () => {
  let component: ListarComentariosComponent;
  let fixture: ComponentFixture<ListarComentariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarComentariosComponent]
    });
    fixture = TestBed.createComponent(ListarComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
