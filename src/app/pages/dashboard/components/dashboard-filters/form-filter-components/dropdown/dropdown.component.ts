import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TABLE_DATA } from '../../../../../../shared/constants/table-data.contant';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, FormsModule, CommonModule, NgFor],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements ControlValueAccessor {
  public onChangeFn: (value: string | undefined) => void = () => { };
  public onTouchedFn: () => void = () => { };

  private _value!: string;

  @Input() public label!: string;
  @Input() public set value(val: string) {
    this._value = val;
    this.onChangeFn(this._value);
  }

  public constructor(@Self() @Optional() public control: NgControl) {
    this.control && (this.control.valueAccessor = this);
  }

  public get value(): string {
    return this._value;
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: string | undefined) => void): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  public getCategoryOptions(): string[] {
    return [...new Set(TABLE_DATA.map((item) => item.category))];
  }
}
