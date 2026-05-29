import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Myprojects } from './myprojects';

describe('Myprojects', () => {
  let component: Myprojects;
  let fixture: ComponentFixture<Myprojects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Myprojects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Myprojects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
