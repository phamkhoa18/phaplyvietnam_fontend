import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  constructor(private api : ApiService ,private data : DataService) {}

  information_user = new FormGroup({
    name : new FormControl('' , Validators.required ) ,
    phone : new FormControl(''  , [Validators.required, Validators.pattern('[0-9]{10}')]) ,
    email : new FormControl(''  , [Validators.required , Validators.email]),
    select : new FormControl('') ,
    content : new FormControl('')
  });

  panels = [
    { id: 'collapseOne', title: 'Câu hỏi 1: Tư vấn pháp lý về quyền thừa kế tại Việt Nam cho người nước ngoài?', content: 'Để được hỗ trợ về quyền thừa kế tại Việt Nam, dù bạn đang sinh sống ở nước ngoài, bạn có thể liên hệ với công ty pháp lý của chúng tôi để được tư vấn từ xa. Chúng tôi có thể giúp bạn hiểu về quy trình thừa kế, quyền lợi và nghĩa vụ của người thừa kế theo pháp luật Việt Nam.', isCollapsed: false },
    { id: 'collapseTwo', title: 'Câu hỏi 2: Hỗ trợ xin cấp thị thực nhập cảnh vào Việt Nam từ nước ngoài?', content: 'Công ty pháp lý của chúng tôi có thể hỗ trợ bạn trong quá trình xin cấp thị thực để nhập cảnh vào Việt Nam. Chúng tôi sẽ tư vấn cho bạn về loại thị thực phù hợp, yêu cầu và thủ tục cần thiết, cũng như giúp bạn chuẩn bị và nộp đơn xin cấp thị thực.', isCollapsed: true },
    { id: 'collapseThree', title: 'Câu hỏi 3: Hỗ trợ pháp lý và thủ tục đầu tư vào dự án tại Việt Nam từ nước ngoài?', content: 'Công ty pháp lý của chúng tôi có kinh nghiệm trong hỗ trợ các vấn đề pháp lý liên quan đến đầu tư từ nước ngoài vào Việt Nam. Chúng tôi có thể giúp bạn hiểu về quy định và quy trình đầu tư, thủ tục thành lập công ty, cũng như giúp bạn xử lý các vấn đề pháp lý liên quan trong quá trình đầu tư của bạn tại Việt Nam.', isCollapsed: true }
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
