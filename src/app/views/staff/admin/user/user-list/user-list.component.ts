import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from '../../../../../services/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AppointmentViewComponent } from '../../appointment/appointment-view/appointment-view.component';
import { CreateComponent } from '../../../../patient/appointment/create/create.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { Userservice } from '../../../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['email', 'name', 'address', 'role'];
  dataSource: MatTableDataSource<any>; // Specify the type here
  private service = inject(Userservice);
  private dialog = inject(MatDialog);
  data = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource<any>(this.data);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.service.getAll().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  // view(data: any) {
  //   const ref = this.dialog.open(AppointmentViewComponent, {
  //     width: '400px',
  //     data: { appointment: data },
  //   });

  //   ref.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.ngOnInit();
  //     }
  //   });
  // }

  createUser() {
    const ref = this.dialog.open(UserCreateComponent, {
      width: '800px',
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
