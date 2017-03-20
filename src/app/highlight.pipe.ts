import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'myHighlight' })
export class HighlightPipe implements PipeTransform {
  public transform(text: string, search): string {
    if (!text || !search) {
      return text;
    }
    let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    pattern = pattern.split(' ').filter((t) => {
      return t.length > 0;
    }).join('|');
    let regex = new RegExp(pattern, 'gi');

    return search ? text.replace(regex,
      (match) => `<span class="highlight">${match}</span>`)
      : text;
  }
}
