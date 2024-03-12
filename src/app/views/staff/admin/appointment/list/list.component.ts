import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from '../../../../../services/appointment.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class AdminListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'time', 'status'];
  dataSource: MatTableDataSource<any>; // Specify the type here
  private service = inject(AppointmentService);

  appointments = [];

  constructor() {
    this.dataSource = new MatTableDataSource<any>(this.appointments);
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      (appointments) => {
        this.dataSource.data = appointments;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
}
