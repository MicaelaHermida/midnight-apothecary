import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInfoPageComponent } from './usuario-info-page.component';

describe('UsuarioInfoPageComponent', () => {
  let component: UsuarioInfoPageComponent;
  let fixture: ComponentFixture<UsuarioInfoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioInfoPageComponent]
    });
    fixture = TestBed.createComponent(UsuarioInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
