import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-competitions-page',
  templateUrl: './competitions-page.component.html',
  styleUrls: ['./competitions-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompetitionsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
