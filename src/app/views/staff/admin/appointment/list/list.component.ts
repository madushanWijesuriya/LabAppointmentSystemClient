import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from '../../../../../services/appointment.service';
import {
  AppointmentStatus,
  AppointmentViewComponent,
} from '../appointment-view/appointment-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AssignTestComponent } from '../../test/assign-test/assign-test.component';
import { NotificationService } from '../../../../../services/notification.service';
import { AuthService } from '../../../../../services/auth.service';
import { ViewAppointmentTestComponent } from '../../../technician/view-appointment-test/view-appointment-test.component';

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
  appointmentStatus = AppointmentStatus;
  role: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private auth: AuthService) {
    this.role = auth.getRolesFromToken();

    this.dataSource = new MatTableDataSource<any>(this.appointments);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  ngOnInit(): void {
    this.service.getAll(this.role).subscribe(
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

  assignTest(data: any) {
    const ref = this.dialog.open(AssignTestComponent, {
      width: '400px',
      data: data,
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }

  viewAppoinmentTests(id: any) {
    const ref = this.dialog.open(ViewAppointmentTestComponent, {
      data: id,
      width: '1000px',
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
