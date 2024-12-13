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
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  standalone: true,
  styleUrls: ['./add-client-dialog.component.scss'], // Lien vers le fichier SCSS
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
export class AddClientDialogComponent {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Injecte les données pour l'édition
  ) {
    this.clientForm = this.fb.group({
      prenom: [data?.prenom || '', Validators.required],
      nom: [data?.nom || '', Validators.required],
      adresse: [data?.adresse || '', Validators.required],
      telephone: [data?.telephone || '', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      ste: [data?.ste || '', Validators.required],
      dateNaissance: [data?.dateNaissance || '', Validators.required],
      nationalite: [data?.nationalite || '', Validators.required],
      cin: [data?.cin || '', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      dateCin: [data?.dateCin || '', Validators.required],
      lieuCin: [data?.lieuCin || '', Validators.required],
      numPermis: [data?.numPermis || '', Validators.required],
      lieuPermis: [data?.lieuPermis || '', Validators.required],
      datePermis: [data?.datePermis || '', Validators.required],
    });

  }

  onSubmit() {
    // if (this.carForm.valid) {
    this.dialogRef.close({ ...this.data, ...this.clientForm.value }); // Combine les données d'édition avec les nouvelles valeurs
    // }
  }

  onCancel() {
    this.dialogRef.close(); // Ferme le dialog sans rien renvoyer
  }
}
