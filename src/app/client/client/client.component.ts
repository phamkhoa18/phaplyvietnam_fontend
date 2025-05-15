import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form80serviceService } from 'src/app/services/form80service.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit{
    constructor(private renderer : Renderer2, private route: ActivatedRoute, private form80service: Form80serviceService) {
    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.loadScript('https://kit.fontawesome.com/3f73d36db4.js');
    }

    private loadScript(src: string) {
      const script = this.renderer.createElement('script');
      this.renderer.setAttribute(script, 'src', src);
      this.renderer.setAttribute(script, 'crossorigin', 'anonymous');

      // Thêm script vào head
      this.renderer.appendChild(document.head, script);
    }
}
