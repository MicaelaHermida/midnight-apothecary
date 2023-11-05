import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrujaInfoComponent } from './bruja-info.component';

describe('BrujaInfoComponent', () => {
  let component: BrujaInfoComponent;
  let fixture: ComponentFixture<BrujaInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrujaInfoComponent]
    });
    fixture = TestBed.createComponent(BrujaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
