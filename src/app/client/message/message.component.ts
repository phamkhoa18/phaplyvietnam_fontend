import { Component } from '@angular/core';
import {Renderer2} from '@angular/core';

declare global {
  interface Window {
    fbAsyncInit: () => void;
  }
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent {

  constructor() {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

}
