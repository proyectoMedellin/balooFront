import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { ReportsService } from 'src/app/services/reports.service';
import { BeneficiariesService } from 'src/app/services/beneficiaries.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-teacher-information',
  templateUrl: './teacher-information.component.html',
  styleUrls: ['./teacher-information.component.css'],
})
export class TeacherInformationComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public dataSource = new MatTableDataSource<any>();
  public id!: string;
  public type: string = 'reports';
  public selectedUser: any;
  public IsloadedPhoto: boolean = false;
  public teacherInfo: any;
  public familyMembers: any;
  public beneficiaryPhoto: any | undefined;
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
    },
  };
  public lineChartType: ChartType = 'line';
  private studentHeights: any = [];
  private studentWeights: any = [];
  private datesList: any[] = [];
  private studentBmis: any = [];

  //Default Dates
  range = new FormGroup({
    from: new FormControl(moment(new Date()).subtract(1, 'months').format()),
    to: new FormControl(new Date()),
  });
  fromDate = moment(new Date())
    .subtract(1, 'months')
    .format('yyyy-MM-DD');
  toDate = moment(new Date()).format('yyyy-MM-DD');

  // Chart Columns and charts Data
  displayedColumns: string[] = ['date', 'weight', 'bmi', 'size'];
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Talla',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgb(75, 192, 192)',
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      },
      {
        data: [],
        label: 'Peso',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'IMC',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      },
    ],
    labels: this.datesList,
  };

  constructor(
    private userServices: UsersService,
    private route: ActivatedRoute,
    private reportsService: ReportsService,
    public BeneficiariesService: BeneficiariesService
  ) {}

  ngOnInit(): void {
    this.type = history.state.type ?? 'reports';
    this.selectedUser = history.state.user;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.BeneficiariesService.getPhotoById(this.id).subscribe(b => {
        this.beneficiaryPhoto = b['registros'][0];
      });
      this.getStudentInformationById();
      if (this.id && this.type === 'reports') {
        this.getAnthropometricDataById();
      }
    });
  }

  // Anthropometric Data
  private getAnthropometricDataById(): void {
    this.reportsService
      .getAnthropometricDataById(this.id, this.fromDate, this.toDate)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<any>(data['registros']);
        const anthropometricData = data['registros'];
        this.studentHeights = [];
        this.studentWeights = [];
        this.studentBmis = [];
        this.datesList = [];
        anthropometricData.map((e: any) => {
          this.studentHeights.push(e['height'].toString());
          this.studentWeights.push(e['weight'].toString());
          this.studentBmis.push(e['bmi'].toString());
          this.datesList.push(moment(e['createdOn']).format('MM-DD-yyyy'));
        });
        this.lineChartData.labels = this.datesList;
        this.lineChartData.datasets[0].data = this.studentHeights;
        this.lineChartData.datasets[1].data = this.studentWeights;
        this.lineChartData.datasets[2].data = this.studentBmis;
        this.chart?.update();
      });
  }

  // On date change - method
   public onChangeUpdated(): void {
    this.lineChartData.labels = [];
    this.lineChartData.datasets[0].data = [];
    this.lineChartData.datasets[1].data = [];
    this.lineChartData.datasets[2].data = [];
    this.fromDate = moment(this.range.value.from).format('yyyy-MM-DD');
    this.toDate = moment(this.range.value.to).format('yyyy-MM-DD');
    if (this.fromDate && this.toDate !== 'Invalid date') {
      if (this.type === 'reports') {
        this.getAnthropometricDataById();
      }
      setTimeout(() => {
        this.reportsService.dateUpdated.next(true);
      }, 1500);
    }
  }

  // Get Students information
  private async getStudentInformationById(): Promise<void> {
    let data = await this.userServices.getUser(this.selectedUser.userName).toPromise()
    this.teacherInfo = data['registros'][0];


    this.reportsService.getStudentDataById(this.id).subscribe((data) => {
      this.teacherInfo = data['registros'][0];
      if (this.teacherInfo.photoUrl != '') {
        this.IsloadedPhoto = true;
      }
      this.familyMembers = this.teacherInfo.familyMembers.filter(
        (m: any) => m.attendant
      );
    });
  }
}
