import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.scss']
})
export class FormContactComponent {

  constructor(private api : ApiService , private data : DataService) {}
  information_user = new FormGroup({
    name : new FormControl('' , Validators.required ) ,
    phone : new FormControl(''  , [Validators.required, Validators.pattern('[0-9]{10}')]) ,
    email : new FormControl(''  , [Validators.required , Validators.email]),
    select : new FormControl('') ,
    content : new FormControl('')
  });

  panels = [
    { id: 'collapseOne', title: 'Q. 1 : Why should I trust your firm for my case?', content: 'Công ty luật tốt nhất mà chúng tôi đảm bảo và trách nhiệm bình đẳng thuộc về những người không thực hiện nghĩa vụ của mình do ý chí yếu kém.', isCollapsed: false },
    { id: 'collapseTwo', title: 'Collapsible Group Item #2', content: 'Công ty luật tốt nhất mà chúng tôi đảm bảo và trách nhiệm bình đẳng thuộc về những người không thực hiện nghĩa vụ của mình do ý chí yếu kém.', isCollapsed: true },
    { id: 'collapseThree', title: 'Collapsible Group Item #3', content: 'Công ty luật tốt nhất mà chúng tôi đảm bảo và trách nhiệm bình đẳng thuộc về những người không thực hiện nghĩa vụ của mình do ý chí yếu kém.', isCollapsed: true }
  ];

  toggleCollapse(panel: any) {
    // console.log(panel);
    panel.isCollapsed != panel.isCollapsed ;
  }





 async submit() {
    if (this.information_user.valid) {
      if(this.information_user.value.select == '') {
          this.information_user.value.select = 'van_de_ho_chieu' ;
      }
      var arraycontent = [] ;
      arraycontent.push(this.information_user.value);

      const object = {
          name : this.information_user.value.name ,
          title : 'Cần hỗ trợ' ,
          content : arraycontent ,
          posision : "support"
      };


 (await this.api.post('/addform' , object)).subscribe((v : any ) => {
  console.log(v);
    if(v.status == 200) {
        this.data.notification('Thông tin gửi lên đã thành công' , 'Cảm ơn bạn , chúng tôi sẽ hỗ trợ bạn nhanh nhất !' , 'success');
        this.resetForm();
    } else {
        this.data.notification('Thông tin gửi lên đã thất bại' , 'Bạn hãy kiểm tra lại xem mạng có ổn định chưa !' , 'error');
    }
 })
    } else {
      // Hiển thị thông báo lỗi hoặc thực hiện các xử lý khác khi form không hợp lệ
      // Ví dụ: thông báo lỗi trên giao diện
      this.information_user.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.information_user.reset();
  }
}
