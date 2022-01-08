import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

import { MyFormData } from '../../../app.interface';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  @Output() onSubmitForm: EventEmitter<MyFormData> = new EventEmitter<MyFormData>();
  range!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.dateAdapter.setLocale('ru');
  }

  createForm() {
    this.range = this.formBuilder.group({
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.range.invalid) {
      return;
    }
    const formatDate = (date: Date): string => {
      return new Intl.DateTimeFormat('fr-CA').format(date);
    };
    const filterDate = {
      dateFrom: formatDate(this.range.value.dateFrom),
      dateTo: formatDate(this.range.value.dateTo),
    };
    this.onSubmitForm.emit(filterDate);
  }
}
