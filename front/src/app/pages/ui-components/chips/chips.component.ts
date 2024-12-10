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
import { ClientService } from './client.service';
import { AddClientDialogComponent } from './add-client-dialog/add-client-dialog.component';


@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
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
export class AppChipsComponent implements OnInit {
  clients: any[] = []; // Liste des véhicules
  displayedColumns: string[] = ['prenom', 'nom', 'adresse', 'telephone', 'ste', 'dateNaissance', 'nationalite', 'cin', 'dateCin', 'lieuCin', 'numPermis', 'datePermis', 'lieuPermis', 'actions'];

  constructor(private dialog: MatDialog, private clientService: ClientService) { }

  ngOnInit() {
    this.loadClients(); // Charger la liste au démarrage
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        console.log("Données reçues : ", data); // Affiche les données JSON dans la console
        this.clients = data; // Affecte les données reçues à la liste des véhicules
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

  deleteClient(client: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: `Voulez-vous vraiment supprimer le client ${client.prenom} ${client.nom} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(client._id).subscribe({
          next: (response) => {
            Swal.fire({
              title: 'Supprimé !',
              text: 'Le client a été supprimée avec succès.',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500, // Le dialogue disparaît après 1.5 secondes
            });
            this.clients = this.clients.filter((c) => c._id !== client._id);
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              title: 'Erreur',
              text: 'Impossible de supprimer le client.',
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

  editClient(client: any): void {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      width: '600px', // Largeur du dialogue
      height: '800px', // Hauteur du dialogue
      panelClass: 'custom-dialog-container',
      data: client, // Passez les données du véhicule sélectionné
    });
    console.log("Client : " + client)
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("result : " + result)
        this.clientService.editClient(result).subscribe({
          next: () => this.loadClients(), // Rechargez la liste après modification
          error: (err) => console.error('Erreur lors de la modification du client', err),
        });
      }
    });
  }

  openAddClientDialog() {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      width: '600px', // Largeur du dialogue
      height: '800px', // Hauteur du dialogue
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientService.addClient(result).subscribe({
          next: () => this.loadClients(), // Recharger la liste après l'ajout
          error: (err) => console.error('Erreur lors de l’ajout du client', err),
        });
      }
    });
  }
}