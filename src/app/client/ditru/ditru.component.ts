import { Component } from '@angular/core';
import { diTruForms } from '../ditru';
@Component({
  selector: 'app-ditru',
  templateUrl: './ditru.component.html',
  styleUrls: ['./ditru.component.scss']
})
export class DitruComponent {
diTruForms = diTruForms ;

  search = '';

    get filteredForms() {
    return this.diTruForms.filter(f =>
      f.title.toLowerCase().includes(this.search.toLowerCase()) ||
      f.description.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
