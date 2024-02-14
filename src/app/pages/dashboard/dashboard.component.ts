import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardFiltersComponent } from './components/dashboard-filters/dashboard-filters.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardFiltersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent { }
