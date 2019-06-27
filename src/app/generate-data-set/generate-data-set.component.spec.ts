import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDataSetComponent } from './generate-data-set.component';

describe('GenerateDataSetComponent', () => {
  let component: GenerateDataSetComponent;
  let fixture: ComponentFixture<GenerateDataSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateDataSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDataSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
