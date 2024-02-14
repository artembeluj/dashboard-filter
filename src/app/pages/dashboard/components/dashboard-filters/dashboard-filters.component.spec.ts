import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';

import { DashboardDataService } from '../../../../core/services/dashboard-data.service';
import { TABLE_DATA } from '../../../../shared/constants/table-data.contant';
import { FilteredDashboardValues } from '../../../../shared/interfaces/filtered-dashboard-values.interface';
import { DashboardFiltersComponent } from './dashboard-filters.component';
import { DropdownComponent } from './form-filter-components/dropdown/dropdown.component';
import { InputComponent } from './form-filter-components/input/input.component';

describe('DashboardFiltersComponent', () => {
  let component: DashboardFiltersComponent;
  let fixture: ComponentFixture<DashboardFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSliderModule,
        NoopAnimationsModule,
        DropdownComponent,
        InputComponent
      ],
      providers: [DashboardDataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should initialize filterForm with default values', () => {
    expect(component.filterForm.value).toEqual({
      name: '',
      category: '',
      priceRange: {
        minPrice: component.getMinPrice(),
        maxPrice: component.getMaxPrice()
      }
    });
  });

  it('should update filtered data when filterForm values change', fakeAsync(() => {
    const dashboardDataService = TestBed.inject(DashboardDataService);
    const spyUpdateFilteredData = spyOn(dashboardDataService, 'updateFilteredData');

    const filterValues: FilteredDashboardValues = {
      name: 'test',
      category: 'category1',
      priceRange: { minPrice: 10, maxPrice: 20 }
    };

    const filteredData = TABLE_DATA.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(filterValues.name.toLowerCase());
      const categoryMatch = item.category.toLowerCase() === filterValues.category.toLowerCase();
      const priceMatch =
        item.price >= filterValues.priceRange.minPrice &&
        item.price <= filterValues.priceRange.maxPrice;

      return nameMatch && categoryMatch && priceMatch;
    });

    component.filterForm.setValue(filterValues);

    expect(spyUpdateFilteredData).toHaveBeenCalledWith(filteredData);
  }));


  it('should call ngOnDestroy on component destruction', () => {
    const destroy$ = (component as any).destroy$ as Subject<void>;
    spyOn(destroy$, 'next');
    spyOn(destroy$, 'complete');

    fixture.destroy();

    expect(destroy$.next).toHaveBeenCalled();
    expect(destroy$.complete).toHaveBeenCalled();
  });

  it('should return minimum price', () => {
    const minPrice = component.getMinPrice();
    expect(minPrice).toEqual(Math.floor(Math.min(...TABLE_DATA.map(item => item.price))));
  });

  it('should return maximum price', () => {
    const maxPrice = component.getMaxPrice();
    expect(maxPrice).toEqual(Math.ceil(Math.max(...TABLE_DATA.map(item => item.price))));
  });

  it('should apply name filter correctly', () => {
    const dashboardDataService = TestBed.inject(DashboardDataService);
    const spyUpdateFilteredData = spyOn(dashboardDataService, 'updateFilteredData').and.callThrough();

    const filterValues: FilteredDashboardValues = {
      name: 'test',
      category: '',
      priceRange: { minPrice: 0, maxPrice: 100 }
    };

    component.applyFilter(filterValues);

    expect(spyUpdateFilteredData).toHaveBeenCalledOnceWith(
      TABLE_DATA.filter(item => item.name.toLowerCase().startsWith('test'))
    );
  });

  it('should apply category filter correctly', () => {
    const dashboardDataService = TestBed.inject(DashboardDataService);
    const spyUpdateFilteredData = spyOn(dashboardDataService, 'updateFilteredData').and.callThrough();

    const filterValues: FilteredDashboardValues = {
      name: '',
      category: 'category1',
      priceRange: { minPrice: 0, maxPrice: 100 }
    };

    component.applyFilter(filterValues);

    expect(spyUpdateFilteredData).toHaveBeenCalledOnceWith(
      TABLE_DATA.filter(item => item.category.toLowerCase() === 'category1')
    );
  });

  it('should apply price range filter correctly', () => {
    const dashboardDataService = TestBed.inject(DashboardDataService);
    const spyUpdateFilteredData = spyOn(dashboardDataService, 'updateFilteredData').and.callThrough();

    const filterValues: FilteredDashboardValues = {
      name: '',
      category: '',
      priceRange: { minPrice: 10, maxPrice: 20 }
    };

    component.applyFilter(filterValues);

    expect(spyUpdateFilteredData).toHaveBeenCalledOnceWith(
      TABLE_DATA.filter(item => item.price >= 10 && item.price <= 20)
    );
  });
});
