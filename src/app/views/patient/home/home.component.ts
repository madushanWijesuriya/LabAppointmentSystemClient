import {
  Component,
  ViewChild,
  inject,
  ElementRef,
  signal,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from '../../../services/appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentStatus } from '../../staff/admin/appointment/appointment-view/appointment-view.component';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../../../services/auth.service';
import { AssignTestComponent } from '../../staff/admin/test/assign-test/assign-test.component';
import { CreateComponent } from '../appointment/create/create.component';
import { PaymentFormComponent } from '../../../components/payment-form/payment-form.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Editor } from 'ngx-editor';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
  html = '';
  editor!: Editor;
  reports: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('content') content!: ElementRef;
  appointmentTestForm!: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {
    this.role = auth.getRolesFromToken();
    this.editor = new Editor();

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
        console.log(appointments);
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  makeAppointment() {
    const ref = this.dialog.open(CreateComponent, {
      width: '400px',
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

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  pay(data: any) {
    const ref = this.dialog.open(PaymentFormComponent, {
      width: '400px',
      data: data,
    });
  }

  downloadReports(appointment: any) {
    this.appointmentTestForm = this.fb.group({
      result: new FormControl(
        JSON.parse(appointment.appointmentTests[1].result)
      ),
    });

    html2canvas(this.content.nativeElement)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        console.log('Image Data:', imgData); // Add this line for debugging
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('example.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  }
}
