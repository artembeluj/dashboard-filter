import { ChangeDetectionStrategy, Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    NgIf
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor {
  public onChangeFn: (value: string | undefined) => void = () => { };
  public onTouchedFn: () => void = () => { };

  @Input() public label!: string;
  @Input() public data!: string;

  public constructor(
    @Self() @Optional() public control: NgControl
  ) {
    this.control && (this.control.valueAccessor = this);
  }

  public registerOnChange(fn:(value: string | undefined) => void): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  public writeValue(obj: string): void {
    this.data = obj;
  }

  public onChange(): void {
    this.onChangeFn(this.data);
  }
}
