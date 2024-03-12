import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from '../../../../../services/appointment.service';
import { AppointmentViewComponent } from '../appointment-view/appointment-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class AdminListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'date',
    'time',
    'workFlow',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<any>; // Specify the type here
  private service = inject(AppointmentService);
  private dialog = inject(MatDialog);
  appointments = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource<any>(this.appointments);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  viewAppointment(data: any) {
    const ref = this.dialog.open(AppointmentViewComponent, {
      width: '400px',
      data: { appointment: data },
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
