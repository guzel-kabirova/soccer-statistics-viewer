import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

export interface TableCell {
  name: string,
  width: string
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent{
@Input() tableData!: TableCell[]

}
