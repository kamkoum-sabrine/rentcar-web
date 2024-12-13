import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/app/material.module';

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  Cost: number;
  RentalPeriod: number;
  priority: string;
  progress: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Mark J. Freeman',
    position: '',
    Cost: 150,
    RentalPeriod: 80,
    priority: 'Active',
    progress: 'success',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Nina R. Oldman',
    position: '',
    Cost: 150,
    RentalPeriod: 80,
    priority: 'Active',
    progress: 'success',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Arya H. Shah',
    position: '',
    Cost: 150,
    RentalPeriod: 80,
    priority: 'Inactive',
    progress: 'error',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'June R. Smith',
    position: '',
    Cost: 150,
    RentalPeriod: 80,
    priority: 'Active',
    progress: 'success',
  },
];

@Component({
  selector: 'app-top-employees',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MaterialModule],
  templateUrl: './top-employees.component.html',
})
export class AppTopEmployeesComponent {
  displayedColumns: string[] = ['Profile', 'Cost', 'RentalPeriod', 'Status'];
  dataSource = ELEMENT_DATA;
}
