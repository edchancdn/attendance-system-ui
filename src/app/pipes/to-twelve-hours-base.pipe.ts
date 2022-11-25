import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'toTwelveHoursBase'
})
export class ToTwelveHoursBasePipe implements PipeTransform {

  transform(value?: string): string {
    return moment(value, 'HH:mm').format('hh:mm A');
  }

}
