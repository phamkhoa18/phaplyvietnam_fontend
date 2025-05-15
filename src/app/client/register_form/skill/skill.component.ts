import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Form80serviceService } from 'src/app/services/form80service.service';
@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {
  jobs: any[] = [];  // Dữ liệu hiển thị trong bảng
  allJobs: any[] = [];  // Dữ liệu ban đầu
  first: number = 0;  // Dùng để xác định trang đầu tiên của phân trang
  lang: string = 'vi' ;
  constructor( private api : ApiService , private form80service: Form80serviceService) { }

  ngOnInit(): void {
    // Giả sử đây là danh sách nghề nghiệp được lấy từ API hoặc dữ liệu cố định
    // Lưu trữ bản sao dữ liệu ban đầu vào allJobs
    this.getData();
    this.form80service.currentLanguage.subscribe((res:any) => {
        this.lang = res ;
    })
  }

  async getData(){
    (await this.api.get('/api_skill')).subscribe(
      (res: any) => {
          this.allJobs = res;
          this.jobs = res ;
      },
      (err) => {
          this.allJobs = [];
          this.jobs = [];
      }
    )
  }

  // Hàm tìm kiếm toàn cục
  // Hàm chuyển đổi chuỗi sang không dấu
removeVietnameseTones(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// Hàm tìm kiếm toàn cục
onGlobalFilter(event: any) {
  const filterValue = event.target.value.toLowerCase();

  // Nếu ô tìm kiếm rỗng, khôi phục lại tất cả dữ liệu
  if (!filterValue) {
    this.jobs = [...this.allJobs];  // Khôi phục lại dữ liệu ban đầu
    return;
  }

  // Lọc dữ liệu khi có giá trị tìm kiếm
  this.jobs = this.allJobs.filter(job => {
    // Xử lý cả tiếng Việt và tiếng Anh
    const vietnameseTextVi = this.removeVietnameseTones(job.vi.toLowerCase());
    const vietnameseTextEn = this.removeVietnameseTones(job.en.toLowerCase());
    const searchValue = this.removeVietnameseTones(filterValue);

    return (
      vietnameseTextVi.includes(searchValue) || // Tìm trong trường vi
      vietnameseTextEn.includes(searchValue) || // Tìm trong trường en
      job.code.includes(filterValue) // Tìm theo mã code
    );
  });
}

}
