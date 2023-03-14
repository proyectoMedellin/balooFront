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
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() id!: string;
  @Input() fromDate!: string;
  @Input() toDate!: string;
  @Input() type!: string;
  public emotions: any[] = [];
  public attendances: any = [];
  public attendenceChartData: any = [];
  public emotionsData: any = [];
  public emotionDataSource = new MatTableDataSource<any>();
  public attendancesDataSource = new MatTableDataSource<any>();
  public emotionTableColumns: string[] = ['date', 'emotion'];
  public attendenceTablecolumns: string[] = ['date', 'attended'];
  private emotionsLabels: any = [];

  // Pie chart for Emotions
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
    labels: this.emotionsLabels,
    datasets: [
      {
        data: this.emotionsData,
      },
    ],
  };

  // Pie chart for Attendence
  public attendencePieChartData: ChartData<'pie', number[], string | string[]> =
    {
      labels: ['Si', 'No'],
      datasets: [
        {
          data: [0, 0],
        },
      ],
    };
  public pieChartType: ChartType = 'pie';
  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    if(this.type == "emotions"){
      this.getEmotionsById();
      this.reportsService.dateUpdated.subscribe((res) => {
        if (res) {
          this.getEmotionsById();
        }
      });
    }else if(this.type == "attendance"){
      this.getAssistenceById();
      this.reportsService.dateUpdated.subscribe((res) => {
        if (res) {
          this.getAssistenceById();
        }
      });
    }
    
  }

  //Get student Emotions
  private getEmotionsById(): void {
    let defaultString = '00000000-0000-0000-0000-000000000000';
    this.reportsService
      .GetEmotionsDataById(this.id, this.fromDate, this.toDate)
      .subscribe((data) => {
        
        this.emotions = data['registros'];
        // filter out all 0's in ID of emotions array
        this.emotions = this.emotions.filter((e) => e.id !== defaultString);
        this.emotionDataSource = new MatTableDataSource<any>(this.emotions);
        // prepare chart emotions dynamic data and update chart
        let emotionsTypes: any = [];
        this.emotions.forEach((e) => emotionsTypes.push(e.emotionName));
        const emotionsCount = emotionsTypes.reduce((a: any, v: any) => {
          a[v] = ++a[v] || 1;

          return a;
        }, []);
        this.emotionsLabels = Object.keys(emotionsCount);
        this.emotionsData = Object.values(emotionsCount);
        this.emotionPieChartData.datasets[0].data = this.emotionsData;
        this.emotionPieChartData.labels = this.emotionsLabels;
        this.chart?.update();

        // assign attendence data to dataSource
        this.attendances = data['registros'];
        this.attendancesDataSource = new MatTableDataSource<any>(
          this.attendances
        );
        this.attendenceChartData = [];
        let yesCount = 0,
          noCount = 0;
        // prepare data and dynamic data for  attendance Chart
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
        this.attendencePieChartData.datasets[0].data = this.attendenceChartData;
        this.chart?.update();
      });
  }

  //Get student assistence 
  private getAssistenceById(): void {
    let defaultString = '00000000-0000-0000-0000-000000000000';
    this.reportsService
      .GetAssistenceDataById(this.id, this.fromDate, this.toDate)
      .subscribe((data) => {
        
        this.emotions = data['registros'];
        // filter out all 0's in ID of emotions array
        this.emotions = this.emotions.filter((e) => e.id !== defaultString);
        this.emotionDataSource = new MatTableDataSource<any>(this.emotions);
        // prepare chart emotions dynamic data and update chart
        let emotionsTypes: any = [];
        this.emotions.forEach((e) => emotionsTypes.push(e.emotionName));
        const emotionsCount = emotionsTypes.reduce((a: any, v: any) => {
          a[v] = ++a[v] || 1;

          return a;
        }, []);
        this.emotionsLabels = Object.keys(emotionsCount);
        this.emotionsData = Object.values(emotionsCount);
        this.emotionPieChartData.datasets[0].data = this.emotionsData;
        this.emotionPieChartData.labels = this.emotionsLabels;
        this.chart?.update();

        // assign attendence data to dataSource
        this.attendances = data['registros'];
        this.attendancesDataSource = new MatTableDataSource<any>(
          this.attendances
        );
        this.attendenceChartData = [];
        let yesCount = 0,
          noCount = 0;
        // prepare data and dynamic data for  attendance Chart
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
        this.attendencePieChartData.datasets[0].data = this.attendenceChartData;
        this.chart?.update();
      });
  }
}
