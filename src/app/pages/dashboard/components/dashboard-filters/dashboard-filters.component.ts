import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { Subject, takeUntil } from 'rxjs';

import { DashboardDataService } from '../../../../core/services/dashboard-data.service';
import { TABLE_DATA } from '../../../../shared/constants/table-data.contant';
import { FilteredDashboardValues } from '../../../../shared/interfaces/filtered-dashboard-values.interface';
import { DashboardTableComponent } from '../dashboard-table/dashboard-table.component';
import { DropdownComponent } from './form-filter-components/dropdown/dropdown.component';
import { InputComponent } from './form-filter-components/input/input.component';

@Component({
  selector: 'app-dashboard-filters',
  standalone: true,
  imports: [
    DashboardTableComponent,
    ReactiveFormsModule,
    MatSliderModule,
    FormsModule,
    DropdownComponent,
    InputComponent
  ],
  templateUrl: './dashboard-filters.component.html',
  styleUrl: './dashboard-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardFiltersComponent implements OnInit, OnDestroy {
  public filterForm!: FormGroup;

  private destroy$: Subject<void> = new Subject<void>();

  public constructor(
    private formBuilder: FormBuilder,
    private dashboardDataService: DashboardDataService
  ) { }

  public ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      name: [''],
      category: [''],
      priceRange: this.formBuilder.group({
        minPrice: [this.getMinPrice()],
        maxPrice: [this.getMaxPrice()]
      })
    });

    this.dashboardDataService.updateFilteredData(TABLE_DATA);

    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((filterValues: FilteredDashboardValues) => {
        this.applyFilter(filterValues);
      });
  }

  public getMinPrice(): number {
    return Math.floor(Math.min(...TABLE_DATA.map(item => item.price)));
  }

  public getMaxPrice(): number {
    return Math.ceil(Math.max(...TABLE_DATA.map(item => item.price)));
  }

  public applyFilter(filterValues: FilteredDashboardValues): void {
    let filteredData = [...TABLE_DATA];
    if (filterValues.name) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().startsWith(filterValues.name.toLowerCase())
      );
    }

    if (filterValues.category) {
      filteredData = filteredData.filter((item) =>
        item.category.toLowerCase() === filterValues.category.toLowerCase()
      );
    }

    const minPrice = filterValues.priceRange.minPrice;
    const maxPrice = filterValues.priceRange.maxPrice;

    if (minPrice && maxPrice) {
      filteredData = filteredData.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    }
    this.dashboardDataService.updateFilteredData(filteredData);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
