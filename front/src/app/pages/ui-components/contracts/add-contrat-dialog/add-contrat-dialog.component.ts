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
import { CarService } from '../../cars/car.service';
import { ClientService } from '../../clients/client.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-contrat-dialog',
  templateUrl: './add-contrat-dialog.component.html',
  standalone: true,
  styleUrls: ['./add-contrat-dialog.component.scss'], // Lien vers le fichier SCSS
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    CommonModule
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
export class AddContratDialogComponent {
  contratForm: FormGroup;
  voitures: any[] = []; // Liste des voitures
  clients: any[] = [];  // Liste des clients
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddContratDialogComponent>,
    private carService: CarService,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any // Injecte les données pour l'édition
  ) {
    this.contratForm = this.fb.group({
      datDebut: [data?.datDebut || '', Validators.required],
      dateFin: [data?.dateFin || '', Validators.required],
      voiture: [data?.voiture || '', Validators.required], // Référence vers la voiture
      conducteur1: [data?.conducteur1 || '', Validators.required], // Référence vers le client conducteur1
      conducteur2: [data?.conducteur2 || ''], // Référence vers le client conducteur2 (optionnel)
      prolongation1: [data?.prolongation1 || ''],
      prolongation2: [data?.prolongation2 || ''],
      changementVoiture: [data?.changementVoiture || ''], // Référence vers une voiture de remplacement (optionnel)
      coutJour: [data?.coutJour || '', [Validators.required, Validators.min(0)]],
    });
    this.carService.getCars().subscribe((data) => {
      this.voitures = data;
    });

    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
    });

  }

  onSubmit() {
    // if (this.carForm.valid) {
    this.dialogRef.close({ ...this.data, ...this.contratForm.value }); // Combine les données d'édition avec les nouvelles valeurs
    // }
  }

  onCancel() {
    this.dialogRef.close(); // Ferme le dialog sans rien renvoyer
  }
}
