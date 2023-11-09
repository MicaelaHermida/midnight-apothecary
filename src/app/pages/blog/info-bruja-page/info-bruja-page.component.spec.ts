import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBrujaPageComponent } from './info-bruja-page.component';

describe('BlogBrujaPageComponent', () => {
  let component: InfoBrujaPageComponent;
  let fixture: ComponentFixture<InfoBrujaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoBrujaPageComponent]
    });
    fixture = TestBed.createComponent(InfoBrujaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
