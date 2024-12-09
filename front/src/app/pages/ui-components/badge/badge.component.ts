import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from './car.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddVehicleDialogComponent } from './add-vehicle-dialog/add-vehicle-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';  // Importez MatTableModule


@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  standalone: true,
  styles: [`
  .vehicle-item {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}
.vehicle-item:last-child {
  border-bottom: none;
}

.button-group {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
.button-container {
  display: flex;
  justify-content: flex-start; /* Aligne le bouton à gauche */
  margin-bottom: 20px; /* Crée un espace entre le bouton et le tableau */
}

table {
  width: 100%; /* Le tableau prend toute la largeur */
}


`],
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatTableModule] // Pour les champs de saisie],
})
export class AppBadgeComponent implements OnInit {
  vehicles: any[] = []; // Liste des véhicules
  displayedColumns: string[] = ['matricule', 'modele', 'couleur', 'puissance', 'carburant', 'anneeModele', 'kilometrage', 'dateVidange'];

  constructor(private dialog: MatDialog, private carService: CarService) { }

  ngOnInit() {
    this.loadVehicles(); // Charger la liste au démarrage
  }

  loadVehicles() {
    this.carService.getCars().subscribe({
      next: (data) => {
        console.log("data" + data)
        this.vehicles = data;
      },
      error: (err) => console.error('Erreur lors du chargement des véhicules', err),
    });
  }

  openAddVehicleDialog() {
    const dialogRef = this.dialog.open(AddVehicleDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.carService.addCar(result).subscribe({
          next: () => this.loadVehicles(), // Recharger la liste après l'ajout
          error: (err) => console.error('Erreur lors de l’ajout du véhicule', err),
        });
      }
    });
  }
}