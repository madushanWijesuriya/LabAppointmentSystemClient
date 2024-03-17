import { Component, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from '../../../../services/appointment.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-patient-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  displayedColumns: string[] = ['id', 'date', 'time', 'workFlow'];
  dataSource: MatTableDataSource<any>; // Specify the type here
  private service = inject(AppointmentService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  appointments = [];

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

  getWorkflowClass(workFlow: number): string {
    switch (workFlow) {
      case 0:
        return 'bg-orange-500';
      case 1:
        return 'bg-green-500';
      case 2:
        return 'bg-blue-500';
      case 3:
        return 'bg-red-500';
      case 4:
        return 'bg-gray-500';
      case 5:
        return 'bg-yellow-500';
      case 6:
        return 'bg-purple-500';
      case 7:
        return 'bg-green-600';
      case 8:
        return 'bg-pink-500';
      default:
        return '';
    }
  }
}
