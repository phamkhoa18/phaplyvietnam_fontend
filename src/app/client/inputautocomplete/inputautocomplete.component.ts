import { Component, ElementRef, Input, NgZone, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Form80serviceService } from 'src/app/services/form80service.service';
import { GooglemapsService } from 'src/app/services/googlemaps.service';

declare var google: any;

@Component({
  selector: 'app-inputautocomplete',
  templateUrl: './inputautocomplete.component.html',
  styleUrls: ['./inputautocomplete.component.scss']
})
export class InputautocompleteComponent implements OnChanges {

  @Input() formcontrolgroup: string | null = null;
  @Input() formcontrolname: string | null = null;
  inputId: string = `autocomplete-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('autocomplete', { static: false }) autocompleteInput!: ElementRef;
  autocomplete: any;

  constructor(
    private ngZone: NgZone,
    private googleMapservice: GooglemapsService,
    private form80service: Form80serviceService
  ) {}

  ngOnInit(): void {
    this.googleMapservice.loadGoogleMaps().then(() => {
      this.initializeAutocomplete();
    }).catch(error => {
      console.error('Error loading Google Maps script:', error);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Cập nhật logic nếu cần thiết
    if (this.formcontrolname && this.formcontrolgroup) {
      console.log(this.formcontrolgroup, this.formcontrolname);
    }
  }

  initializeAutocomplete(): void {
    if (!this.autocompleteInput) {
      console.error('Autocomplete input không được tìm thấy.');
      return;
    }

    const autocompleteOptions = {
      types: ['geocode']
    };

    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.nativeElement, autocompleteOptions);

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete.getPlace();
        if (place.geometry) {
          console.log('Địa điểm đã chọn:', place.formatted_address);
          this.updateForm80Service(place.formatted_address);
        } else {
          console.log('Không có thông tin địa điểm hợp lệ');
        }
      });
    });
  }

  private updateForm80Service(address: string): void {
    try {
      const formGroup = this.form80service.getForm80();
      if (!formGroup) {
        console.error('FormGroup không tồn tại');
        return;
      }

      const group = formGroup.get(this.formcontrolgroup) as FormGroup;
      if (!group) {
        console.error('FormGroup không tồn tại với tên:', this.formcontrolgroup);
        return;
      }

      const formControl = group.get([this.formcontrolname]);

      if (!formControl) {
        console.error('FormControl không tồn tại với tên:', this.formcontrolname);
        return;
      }

      formControl.setValue(address);
      console.log(group.value);
    } catch (error) {
      console.error('Lỗi khi cập nhật Form80Service:', error);
    }
  }
}
