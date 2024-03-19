import { Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentTestService } from '../../../../services/appointment-test.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AppointmentStatus } from '../../admin/appointment/appointment-view/appointment-view.component';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../../../../services/auth.service';
import { UpdateAppointmentTestComponent } from '../update-appointment-test/update-appointment-test.component';

@Component({
  selector: 'app-view-appointment-test',
  templateUrl: './view-appointment-test.component.html',
  styleUrl: './view-appointment-test.component.scss',
})
export class ViewAppointmentTestComponent implements OnInit {
  displayedColumns: string[] = ['appointment', 'test', 'result', 'actions'];
  dataSource: MatTableDataSource<any>; // Specify the type here
  private service = inject(AppointmentTestService);
  private dialog = inject(MatDialog);
  appointments = [];
  appointmentStatus = AppointmentStatus;
  role: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public id: any
  ) {
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
    this.service.getAll(this.id).subscribe(
      (appointmentTests) => {
        this.dataSource.data = appointmentTests;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  updateTestResult(appTest: any) {
    const ref = this.dialog.open(UpdateAppointmentTestComponent, {
      width: '1000px',
      data: appTest,
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
