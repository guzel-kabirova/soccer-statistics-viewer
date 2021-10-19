import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
