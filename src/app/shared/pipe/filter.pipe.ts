import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchText: string): any[] {
    if (!searchText) {
      return value;
    }
    return value.filter(item => item.title.includes(searchText));
  }
}
