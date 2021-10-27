import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppStoreService } from '../../services/app.store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  isFetching$: Observable<boolean> = this.store.isFetching$;

  constructor(private store: AppStoreService) {
  }
}
