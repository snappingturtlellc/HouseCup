import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: Array<string>, args: string): Array<string> {
    console.log("sort")
    array.sort((a: any, b: any) => {
      if (a.$points < b.$points) {
        return -1;
      } else if (a.$points > b.$points) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
