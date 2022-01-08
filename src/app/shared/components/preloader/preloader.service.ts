import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, switchMapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {

  private isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();

  showPreloaderUntilComplete<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.loadingOn()),
        switchMapTo(obs$),
        finalize(() => this.loadingOff()),
      );
  }

  loadingOn() {
    this.isLoading.next(true);
  }

  loadingOff() {
    this.isLoading.next(false);
  }
}
