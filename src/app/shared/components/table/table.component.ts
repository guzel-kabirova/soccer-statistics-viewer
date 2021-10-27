import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppStoreService } from '../../services/app.store.service';
import { Observable } from 'rxjs';

export interface TableCell {
  name: string,
  width: string
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @Input() thead!: TableCell[];
  isFetching$: Observable<boolean> = this.store.isFetching$;
  constructor(private store: AppStoreService) {
  }
}
