import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any): SafeHtml {
    const transformedHtml = value.replace(/<a /g, '<a target="_blank" ');
    return this.sanitizer.bypassSecurityTrustHtml(transformedHtml);
  }
}
