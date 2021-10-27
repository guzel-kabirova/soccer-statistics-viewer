import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  searchStr = '';

  constructor() { }

  onClick() {
    this.onSearch.emit(this.searchStr);
  }
}
