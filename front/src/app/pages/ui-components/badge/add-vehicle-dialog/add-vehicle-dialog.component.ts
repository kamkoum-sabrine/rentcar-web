import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../car.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-add-vehicle-dialog',
  templateUrl: './add-vehicle-dialog.component.html',
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule], // Pour les champs de saisie],
  styles: [`
   .styled-card {
    max-width: 800px; 
    margin: 20px auto;
    padding: 20px;
    height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .scrollable-container {
    overflow-y: auto; /* Active le défilement vertical */
    flex-grow: 1; /* Utilise tout l'espace disponible */
    padding-right: 10px; /* Évite le chevauchement avec la barre de défilement */
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 15px; /* Ajoute de l'espace entre les champs */
  }

  .form-field {
    width: 100%; /* Champs à pleine largeur */
  }

  .submit-button {
    align-self: flex-end;
    margin-top: 20px;
  }
`],
})
export class AddVehicleDialogComponent {
  carForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddVehicleDialogComponent>) {
    this.carForm = this.fb.group({
      matricule: ['', Validators.required],
      modele: ['', Validators.required],
      couleur: ['', Validators.required],
      puissance: ['', [Validators.required, Validators.min(1)]],
      carburant: ['', Validators.required],
      anneeModele: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      kilometrage: ['', [Validators.required, Validators.min(0)]],
      dateVidange: ['', Validators.required],
    });
  }

  onSubmit() {
    this.dialogRef.close(this.carForm.value); // Renvoie les données à l'appelant
  }

  onCancel() {
    this.dialogRef.close(); // Ferme le dialog sans rien renvoyer
  }
}
