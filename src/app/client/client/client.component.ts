import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form80serviceService } from 'src/app/services/form80service.service';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit{
    constructor(private renderer : Renderer2, private route: ActivatedRoute, private form80service: Form80serviceService, private primengConfig: PrimeNGConfig) {
    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.loadScript('https://kit.fontawesome.com/3f73d36db4.js');
       this.primengConfig.setTranslation({
      dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
      dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
      monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
                  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
      monthNamesShort: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", 
                        "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
      today: 'Hôm nay',
      clear: 'Xóa'
    });
    }

    private loadScript(src: string) {
      const script = this.renderer.createElement('script');
      this.renderer.setAttribute(script, 'src', src);
      this.renderer.setAttribute(script, 'crossorigin', 'anonymous');

      // Thêm script vào head
      this.renderer.appendChild(document.head, script);
    }
}
