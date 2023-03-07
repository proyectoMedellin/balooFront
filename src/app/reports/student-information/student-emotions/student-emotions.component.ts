import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-student-emotions',
  templateUrl: './student-emotions.component.html',
  styleUrls: ['./student-emotions.component.css'],
})
export class StudentEmotionsComponent implements OnInit {
  @Input() id!: string;
  @Input() fromDate!: string;
  @Input() toDate!: string;
  @Input() type!: string;
  public emotions: any[] = [];
  public attendances: any = [];
  public attendenceChartData: any = [];
  public emotionDataSource = new MatTableDataSource<any>();
  public attendancesDataSource = new MatTableDataSource<any>();
  emotionTableColumns: string[] = ['date', 'emotion'];
  attendenceTablecolumns: string[] = ['date', 'attended'];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public emotionPieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    datasets: [
      {
        data: [2, 1, 0],
      },
    ],
  };
  public attendencePieChartData: ChartData<'pie', number[], string | string[]> =
    {
      labels: ['Yes', 'No'],
      datasets: [
        {
          data: [],
        },
      ],
    };
  public pieChartType: ChartType = 'pie';
  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.getEmotionsById();
    this.reportsService.dateUpdated.subscribe((res) => {
      if (res) {
        this.getEmotionsById();
      }
    });
  }

  //Get student Emotions
  private getEmotionsById(): void {
    let defaultString = '00000000-0000-0000-0000-000000000000';
    this.reportsService
      .GetEmotionsDataById(this.id, this.fromDate, this.toDate)
      .subscribe((data) => {
        this.attendenceChartData = [];
        let yesCount = 0,noCount = 0;
        this.emotions = data['registros'];
        this.emotions = this.emotions.filter((e) => e.id !== defaultString);
        this.attendances = data['registros'];
        this.attendances.forEach((e: any) => {
          if (e.id !== defaultString) {
            e.attendant = 'Sí';
          } else e.attendant = 'No';
          if (e.attendant === 'Sí') {
            yesCount++;
          } else {
            noCount++;
          }
        });
        this.attendenceChartData.push(yesCount);
        this.attendenceChartData.push(noCount);
        this.attendencePieChartData.datasets[0].data =
          this.attendenceChartData;
        this.chart?.update();
        this.attendancesDataSource = new MatTableDataSource<any>(
          this.attendances
        );
        this.emotionDataSource = new MatTableDataSource<any>(this.emotions);
      });
  }
}
