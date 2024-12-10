import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';  // Importez MatTableModule
import Swal from 'sweetalert2';
import { ContratsService } from './contrats.service';
import { AddContratDialogComponent } from './add-contrat-dialog/add-contrat-dialog.component';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
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

.table-container {
  max-height: 400px; /* Limite la hauteur maximale de la table */
  overflow-y: auto;  /* Active le défilement vertical */
  overflow-x: auto;  /* Active le défilement horizontal si nécessaire */
}

table {
  width: 100%; /* S'assure que la table occupe toute la largeur disponible */
}


`],
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatTableModule] // Pour les champs de saisie],
})
export class AppListsComponent implements OnInit {
  contrats: any[] = []; // Liste des véhicules

  displayedColumns: string[] = ['datDebut', 'dateFin', 'voiture', 'conducteur1', 'conducteur2', 'prolongation1', 'prolongation2', 'changementVoiture', 'coutJour', 'actions'];

  constructor(private dialog: MatDialog, private contratService: ContratsService) { }

  ngOnInit() {
    this.loadContrats(); // Charger la liste au démarrage
  }

  loadContrats() {
    this.contratService.getContrats().subscribe({
      next: (data) => {
        console.log("Données reçues : ", data); // Affiche les données JSON dans la console
        this.contrats = data; // Affecte les données reçues à la liste des véhicules
      },
      error: (err) => {
        console.error('Erreur lors du chargement des contrats', err);
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

  deleteContrat(contrat: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer le contrat num ${contrat._id}  ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.contratService.deleteContrat(contrat._id).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Supprimé !',
              text: 'Le contrat a été supprimée avec succès.',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500, // Le dialogue disparaît après 1.5 secondes
            });
            this.contrats = this.contrats.filter((c) => c._id !== contrat._id);
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: 'Erreur',
              text: 'Impossible de supprimer le contrat.',
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

  editContrat(contrat: any): void {
    const dialogRef = this.dialog.open(AddContratDialogComponent, {
      width: '600px', // Largeur du dialogue
      height: '800px', // Hauteur du dialogue
      panelClass: 'custom-dialog-container',
      data: contrat, // Passez les données du contrat sélectionné
    });
    console.log("contrat : " + contrat)
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("result : " + result)
        this.contratService.editContrat(result).subscribe({
          next: () => this.loadContrats(), // Rechargez la liste après modification
          error: (err) => console.error('Erreur lors de la modification du contrat', err),
        });
      }
    });
  }

  openAddContratDialog() {
    const dialogRef = this.dialog.open(AddContratDialogComponent, {
      width: '600px', // Largeur du dialogue
      height: '800px', // Hauteur du dialogue
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.contratService.addContrat(result).subscribe({
          next: () => this.loadContrats(), // Recharger la liste après l'ajout
          error: (err) => console.error('Erreur lors de l’ajout du contrat', err),
        });
      }
    });
  }
}