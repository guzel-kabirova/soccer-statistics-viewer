import { Pipe, PipeTransform } from '@angular/core';
import { CompetitionModel } from '../models/app.model';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(arr: CompetitionModel[] , searchStr: string): CompetitionModel[] {
    if (searchStr.trim()) {
      return arr.filter(el => el.name.toLowerCase().includes(searchStr.toLowerCase()));
    }
    return arr;
  }

}
