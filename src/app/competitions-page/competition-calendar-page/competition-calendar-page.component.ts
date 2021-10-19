import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-competition-calendar-page',
  templateUrl: './competition-calendar-page.component.html',
  styleUrls: ['./competition-calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompetitionCalendarPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
