import { Pipe, PipeTransform } from '@angular/core';
import { IMember } from '../class/member';

@Pipe({
  name: 'sortByPointsAndName'
})
export class SortByPointsAndNamePipe implements PipeTransform {

  transform(array: Array<IMember>, args: string): Array<IMember> {
    console.log("sort2")
    array.sort((a: IMember, b: IMember) => {
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
