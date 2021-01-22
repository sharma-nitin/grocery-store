import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByCategory'
})
export class SortByCategoryPipe implements PipeTransform {

  transform(value,categoryid) {
    const filteredProducts = value.filter((item)=>{
        return item.category === categoryid || categoryid ==='';
     })
     return filteredProducts;
  }

}
