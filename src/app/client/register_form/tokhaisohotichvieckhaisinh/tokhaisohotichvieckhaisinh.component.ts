import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tokhaisohotichvieckhaisinh',
  templateUrl: './tokhaisohotichvieckhaisinh.component.html',
  styleUrls: ['./tokhaisohotichvieckhaisinh.component.scss']
})
export class TokhaisohotichvieckhaisinhComponent {
  public lylichtuphap: FormGroup;

  constructor(
    private data: DataService,
    public api: ApiService,
    private titleService: Title
  ) {
    this.titleService.setTitle('TỜ KHAI GHI VÀO SỔ HỘ TỊCH VIỆC KHAI SINH');

    this.lylichtuphap = new FormGroup({
      fullname_req: new FormControl('', Validators.required),
      cmnd_req: new FormControl(''),
      relationship_req: new FormControl(''),
      address_req: new FormControl(''),
      gender_req: new FormControl('Nam', Validators.required),
      d14d: new FormControl(''),
      d14m: new FormControl(''),
      d14y: new FormControl(''),
      date_day: new FormControl(''),
      date_month: new FormControl(''),
      date_year: new FormControl(''),
      date_req: new FormControl(''),
      phone: new FormControl(''),
      fullname: new FormControl(''),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required), 
      nation: new FormControl(''),
      religion: new FormControl(''),
      national: new FormControl(''),
      gender: new FormControl('Nam', Validators.required),
      date: new FormControl('', Validators.required),
      cmnd_14: new FormControl(''),
      date_text: new FormControl(''),
      birthplace: new FormControl(''),
      nativeland: new FormControl(''),
      cmnd_day: new FormControl(''),
      name_dad: new FormControl(''),
      date_dad: new FormControl(''),
      address_foreign_14: new FormControl(''),
      address_vn: new FormControl(''),
      nation_dad: new FormControl(''),
      national_dad: new FormControl(''),
      address_dad: new FormControl(''),
      nativeland_dad: new FormControl(''),
      name_mother: new FormControl(''),
      date_mother: new FormControl(''),
      nation_mother: new FormControl(''),
      national_mother: new FormControl(''),
      address_mother: new FormControl(''),
      nativeland_mother: new FormControl(''),
      register: new FormControl(''),
      register_date: new FormControl(''),
      passport: new FormControl(""),
      day_pp: new FormControl(''),
      numberregister: new FormControl(''),
      address_register: new FormControl('Úc (Australia)'),
      date_cap_register: new FormControl(''),
      date_ngay_now: new FormControl(''),
      date_thang_now: new FormControl(''),
      date_nam_now: new FormControl('')
    });
  }

  // toDateFormat(value: string): string {
  //   if (!value) return '';
  //   const valuenew = value.split('-');
  //   return `${valuenew[2]}/${valuenew[1]}/${valuenew[0]}`;
  // }

  async submit() {
    if (this.lylichtuphap.valid) {
      const date = new Date();
      this.lylichtuphap.value.date_ngay_now = date.getDate().toString();
      this.lylichtuphap.value.date_thang_now = (date.getMonth() + 1).toString();
      this.lylichtuphap.value.date_nam_now = date.getFullYear().toString();

      // Format các trường ngày thành dd/mm/yyyy
      const toDateFormat = (value: string): string => {
        if (!value) return '';
        const d = new Date(value);
        if (isNaN(d.getTime())) return value; // nếu không hợp lệ thì trả lại nguyên
        const day = d.getUTCDate().toString().padStart(2, '0');
        const month = (d.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = d.getUTCFullYear();
        return `${day}/${month}/${year}`;
      };

      const formattedValues = { ...this.lylichtuphap.value };
      const validDates = [
        'date',
        'date_dad',
        'date_mother',
        'register_date',
        'date_cap_register',
        'date_req',
        'cmnd_day',
        'day_pp'
      ];

            // 👇 Tách ngày - tháng - năm cho date_req
      if (formattedValues['date']) {
        const d = new Date(formattedValues['date']);
        if (!isNaN(d.getTime())) {
          formattedValues['d14d'] = d.getUTCDate().toString().padStart(2, '0');
          formattedValues['d14m'] = (d.getUTCMonth() + 1).toString().padStart(2, '0');
          formattedValues['d14y'] = d.getUTCFullYear().toString();
        }
      }

      if (formattedValues['date_req']) {
        const d = new Date(formattedValues['date_req']);
        if (!isNaN(d.getTime())) {
          formattedValues['date_day'] = d.getUTCDate().toString().padStart(2, '0');
          formattedValues['date_month'] = (d.getUTCMonth() + 1).toString().padStart(2, '0');
          formattedValues['date_year'] = d.getUTCFullYear().toString();
        }
      }

      for (const field of validDates) {
        if (formattedValues[field]) {
          if (field === 'date_dad' || field === 'date_mother') {
            const d = new Date(formattedValues[field]);
            formattedValues[field] = isNaN(d.getTime()) ? formattedValues[field] : d.getUTCFullYear().toString();
          } else {
            formattedValues[field] = toDateFormat(formattedValues[field]);
          }
        }
      }

      const arraycontent = [formattedValues];
      const data = new FormData();
      data.append('name', this.lylichtuphap.value.fullname_req?.toString() ?? '');
      data.append('title', 'HỘ TỊCH KHAI SINH');
      data.append('content', JSON.stringify(arraycontent));
      data.append('posision', 'hotichkhaisinh');

      (await this.api.post('/addform', data)).subscribe((v: any) => {
        if (v.status === 200) {
          this.data.notification(
            'Thông tin gửi lên đã thành công',
            'Cảm ơn bạn, chúng tôi sẽ hỗ trợ bạn nhanh nhất!',
            'success',
            v.filename,
            'output_docx'
          );
          console.log(v.filename);
        } else {
          this.data.notification(
            'Thông tin gửi lên đã thất bại',
            'Bạn hãy kiểm tra lại xem mạng có ổn định chưa!',
            'error',
            '',
            ''
          );
        }
      });

      const data2 = new FormData();
      data2.append('name', this.lylichtuphap.value.fullname_req?.toString() ?? '');
      data2.append('title', 'Hộ chiếu dưới 14');
      data2.append('content', JSON.stringify(arraycontent));
      data2.append('posision', 'ho_chieu_duoi_14');

      (await this.api.post('/addform', data2)).subscribe((v: any) => {
        
        if (v.status === 200) {
          this.data.notification(
            'Thông tin gửi lên đã thành công',
            'Cảm ơn bạn, chúng tôi sẽ hỗ trợ bạn nhanh nhất!',
            'success',
            v.filename,
            'output_docx'
          );
          console.log(v.filename);
          this.resetForm();
        } else {
          this.data.notification(
            'Thông tin gửi lên đã thất bại',
            'Bạn hãy kiểm tra lại xem mạng có ổn định chưa!',
            'error',
            '',
            ''
          );
        }
      });
    } else {
      this.lylichtuphap.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.lylichtuphap.reset({
      gender_req: 'Nam',
      gender: 'Nam',
      address_register: 'Úc (Australia)'
    });
  }
}