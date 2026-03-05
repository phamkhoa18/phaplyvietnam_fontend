import { Component } from '@angular/core';
import { lanhSuForms } from '../lanhsu';
@Component({
  selector: 'app-lanhsu',
  templateUrl: './lanhsu.component.html',
  styleUrls: ['./lanhsu.component.scss']
})
export class LanhsuComponent {
  search = '';
  lanhSuForms = lanhSuForms ;

    get filteredForms() {
    return this.lanhSuForms.filter(f =>
      f.title.toLowerCase().includes(this.search.toLowerCase()) ||
      f.description.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
