import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';

interface stats {
  id: number;
  color: string;
  title: string;
  subtitle: string;
  img: string;
  percent: string;
}

interface stats2 {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}


@Component({
  selector: 'app-upcoming-schedules',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, TablerIconsModule, MatButtonModule, MatIconModule],
  templateUrl: './upcoming-schedules.component.html',
})
export class AppUpcomingSchedulesComponent {
  constructor() { }

  stats: stats[] = [
    {
      id: 1,
      color: 'primary',
      title: 'Paypal',
      subtitle: 'Big Brands',
      img: 'assets/images/svgs/icon-paypal.svg',
      percent: '6235',
    },
    {
      id: 2,
      color: 'success',
      title: 'Wallet',
      subtitle: 'Bill payment',
      img: 'assets/images/svgs/icon-office-bag.svg',
      percent: '345',
    },
    {
      id: 3,
      color: 'warning',
      title: 'Credit Card',
      subtitle: 'Money reversed',
      img: 'assets/images/svgs/icon-master-card.svg',
      percent: '2235',
    },
    {
      id: 4,
      color: 'error',
      title: 'Refund',
      subtitle: 'Bill Payment',
      img: 'assets/images/svgs/icon-pie.svg',
      percent: '32',
    },
  ];

  stats2: stats2[] = [
    {
      id: 1,
      time: '31/12/2024 09.30 am',
      color: 'primary',
      subtext: 'Change oil 245TN2012',
    },
    {
      id: 2,
      time: '28/12/2024 10.30 am',
      color: 'accent',
      title: 'Change oil 241TN3215'

    },
    {
      id: 3,
      time: '19/12/2024 12.30 pm',
      color: 'success',
      subtext: 'Change oil 238TN1478',
    },
    {
      id: 4,
      time: '17/12/2024 12.30 pm',
      color: 'warning',
      title: 'Technical Inspection 216TN1546'
    },
    {
      id: 5,
      time: '16/12/2024 12.30 pm',
      color: 'error',
      title: 'Change oil 246TN2020'
    },
    {
      id: 6,
      time: '15/12/2024 12.30 pm',
      color: 'success',
      subtext: 'Technical inspection 235TN1546',
    },
  ];
}
