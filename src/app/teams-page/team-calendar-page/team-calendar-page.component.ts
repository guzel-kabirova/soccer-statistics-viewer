import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-team-calendar-page',
  templateUrl: './team-calendar-page.component.html',
  styleUrls: ['./team-calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamCalendarPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
