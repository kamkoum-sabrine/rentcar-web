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
import Swal from 'sweetalert2';


@Component({
  selector: 'app-badge',
  templateUrl: './cars.component.html',
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
export class AppCarComponent implements OnInit {
  vehicles: any[] = []; // Liste des véhicules
  displayedColumns: string[] = ['matricule', 'modele', 'couleur', 'puissance', 'carburant', 'anneeModele', 'kilometrage', 'dateVidange', 'actions'];

  constructor(private dialog: MatDialog, private carService: CarService) { }

  ngOnInit() {
    this.loadVehicles(); // Charger la liste au démarrage
  }

  loadVehicles() {
    this.carService.getCars().subscribe({
      next: (data) => {
        console.log("Données reçues : ", data); // Affiche les données JSON dans la console
        this.vehicles = data; // Affecte les données reçues à la liste des véhicules
      },
      error: (err) => {
        console.error('Erreur lors du chargement des véhicules', err);
      },
    });
  }



  /**deleteVehicle(car: any) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la voiture ${car.modele} ?`)) {
      console.log("Véhicule : ", JSON.stringify(car, null, 2)); // Affiche l'objet JSON bien formaté
      this.carService.deleteCar(car._id).subscribe({
        next: (response) => {
          alert(response.msg); // Affiche le message du serveur
          this.vehicles = this.vehicles.filter((c) => c._id !== car._id); // Mise à jour locale
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de la suppression');
        },
      });
    }
  }**/

  deleteVehicle(car: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer la voiture ${car.modele} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carService.deleteCar(car._id).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Supprimé !',
              text: 'La voiture a été supprimée avec succès.',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500, // Le dialogue disparaît après 1.5 secondes
            });
            this.vehicles = this.vehicles.filter((c) => c._id !== car._id);
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: 'Erreur',
              text: 'Impossible de supprimer la voiture.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          },
        });
      }
    });
  }

  /**deleteVehicle(vehicle: any): void {
    console.log('Deleting vehicle:', vehicle);
    // Implémentez ici la logique pour supprimer le véhicule
  }**/

  editVehicle(vehicle: any): void {
    const dialogRef = this.dialog.open(AddVehicleDialogComponent, {
      width: '600px', // Largeur du dialogue
      height: '800px', // Hauteur du dialogue
      panelClass: 'custom-dialog-container',
      data: vehicle, // Passez les données du véhicule sélectionné
    });
    console.log("Vehicule : " + vehicle)
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("result : " + result)
        this.carService.editCar(result).subscribe({
          next: () => this.loadVehicles(), // Rechargez la liste après modification
          error: (err) => console.error('Erreur lors de la modification du véhicule', err),
        });
      }
    });
  }

  openAddVehicleDialog() {
    const dialogRef = this.dialog.open(AddVehicleDialogComponent, {
      width: '600px', // Largeur du dialogue
      height: '800px', // Hauteur du dialogue
      panelClass: 'custom-dialog-container'
    });

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