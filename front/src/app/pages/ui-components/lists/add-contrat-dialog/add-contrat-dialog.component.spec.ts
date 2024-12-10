import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContratDialogComponent } from './add-contrat-dialog.component';

describe('AddContratDialogComponent', () => {
  let component: AddContratDialogComponent;
  let fixture: ComponentFixture<AddContratDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContratDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContratDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
