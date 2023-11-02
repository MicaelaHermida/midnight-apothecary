import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogBrujaPageComponent } from './blog-bruja-page.component';

describe('BlogBrujaPageComponent', () => {
  let component: BlogBrujaPageComponent;
  let fixture: ComponentFixture<BlogBrujaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogBrujaPageComponent]
    });
    fixture = TestBed.createComponent(BlogBrujaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
