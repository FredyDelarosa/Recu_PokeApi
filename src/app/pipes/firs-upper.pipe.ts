import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firsUpper',
  standalone: true
})
export class FirsUpperPipe implements PipeTransform {

  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
