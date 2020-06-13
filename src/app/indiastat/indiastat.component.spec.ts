import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiastatComponent } from './indiastat.component';

describe('IndiastatComponent', () => {
  let component: IndiastatComponent;
  let fixture: ComponentFixture<IndiastatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiastatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiastatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
