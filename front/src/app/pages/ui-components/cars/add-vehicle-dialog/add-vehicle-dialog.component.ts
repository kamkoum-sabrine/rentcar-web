import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-add-vehicle-dialog',
  templateUrl: './add-vehicle-dialog.component.html',
  standalone: true,
  styleUrls: ['./add-vehicle-dialog.component.scss'], // Lien vers le fichier SCSS
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  styles: [
    `
      .styled-card {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        height: 80vh;
        display: flex;
        flex-direction: column;
      }

      .scrollable-container {
        overflow-y: auto;
        flex-grow: 1;
        padding-right: 10px;
      }

      .form-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .form-field {
        width: 100%;
      }

      .submit-button {
        align-self: flex-end;
        margin-top: 20px;
      }
    `,
  ],
})
export class AddVehicleDialogComponent {
  carForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddVehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Injecte les données pour l'édition
  ) {
    this.carForm = this.fb.group({
      matricule: [data?.matricule || '', Validators.required],
      modele: [data?.modele || '', Validators.required],
      couleur: [data?.couleur || '', Validators.required],
      puissance: [data?.puissance || '', [Validators.required, Validators.min(1)]],
      carburant: [data?.carburant || '', Validators.required],
      anneeModele: [data?.anneeModele || '', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      kilometrage: [data?.kilometrage || '', [Validators.required, Validators.min(0)]],
      dateVidange: [data?.dateVidange || '', Validators.required],
    });
  }

  onSubmit() {
    // if (this.carForm.valid) {
    this.dialogRef.close({ ...this.data, ...this.carForm.value }); // Combine les données d'édition avec les nouvelles valeurs
    // }
  }

  onCancel() {
    this.dialogRef.close(); // Ferme le dialog sans rien renvoyer
  }
}
