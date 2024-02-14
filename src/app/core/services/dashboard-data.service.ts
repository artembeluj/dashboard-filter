import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableData } from '../../shared/interfaces/table-data.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  private filteredDataSubject = new BehaviorSubject<TableData[]>([]);
  public filteredData$: Observable<TableData[]> = this.filteredDataSubject.asObservable();

  public updateFilteredData(data: TableData[]): void {
    this.filteredDataSubject.next(data);
  }
}
