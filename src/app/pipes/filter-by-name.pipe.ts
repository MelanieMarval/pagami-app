import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../core/api/products/product';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(products: Product[], search: string): any {
      if (search === undefined || search.trim() === '') {
          return products;
      } else {
          return products.filter(product => {
              if (product.name && product.name.toLowerCase().includes(search.toLowerCase())) {
                  return product.name.toLowerCase().includes(search.toLowerCase());
              }
          });
      }
  }

}
