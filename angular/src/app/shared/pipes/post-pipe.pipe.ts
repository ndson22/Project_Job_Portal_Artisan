import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postPipe',
})
export class PostPipePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.substr(0, 150) + '...';
  }
}
