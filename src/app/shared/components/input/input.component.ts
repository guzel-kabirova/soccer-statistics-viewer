import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  value: string = '';

  constructor() { }

  search() {
    this.onSearch.emit(this.value);
  }

  clear() {
    this.value = ''
    this.search();
  }
}
