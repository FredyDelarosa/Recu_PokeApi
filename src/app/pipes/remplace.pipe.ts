import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remplace',
  standalone: true
})
export class RemplacePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/[ao]/gi, 'x');
  }

}
