import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Subject, takeUntil } from 'rxjs';

import { TableData } from '../../../../shared/interfaces/table-data.interface';
import { TABLE_DATA } from '../../../../shared/constants/table-data.contant';
import { DashboardDataService } from '../../../../core/services/dashboard-data.service';
import { DASHBOARD_TABLE_COLUMNS } from '../../../../shared/constants/dashboard-table-columns.contant';

@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardTableComponent implements AfterViewInit, OnInit {
  public dataSource = new MatTableDataSource<TableData>(TABLE_DATA);
  public displayedColumns: string[] = DASHBOARD_TABLE_COLUMNS;

  private destroy$: Subject<void> = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public constructor(
    private dashboardDataService: DashboardDataService
  ) { }


  public ngOnInit(): void {
    this.dashboardDataService.filteredData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((filteredData) => {
        this.dataSource.data = filteredData;
      });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
