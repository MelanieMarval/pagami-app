import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../core/api/products/product';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(items: any[], search: string): any {
      if (search === undefined || search.trim() === '') {
          return items;
      } else {
          return items.filter(item => {
              if (item.name && item.name.toLowerCase().includes(search.toLowerCase())) {
                  return item.name.toLowerCase().includes(search.toLowerCase());
              }
          });
      }
  }

}
