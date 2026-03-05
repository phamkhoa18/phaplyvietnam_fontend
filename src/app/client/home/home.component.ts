
import { Component } from '@angular/core';
declare var $:any ;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
 search = '';
  showLanhSu = true;
  showDiTru = true;

  routeList = [
  {
    title: 'Tờ khai hộ chiếu',
    link: '/dang-ky/ho-chieu-v2',
    description: 'Mẫu tờ khai để đăng ký làm hộ chiếu phổ thông Việt Nam.',
    image: 'https://cdn.thuvienphapluat.vn/uploads/Hoidapphapluat/2024/DTT/10012024/mau-to-khai.jpg',
    category: 'lanh_su'
  },
  {
    title: 'Tờ khai hộ chiếu dưới 14 tuổi',
    link: '/dang-ky/ho-chieu-duoi-14',
    description: 'Tờ khai làm hộ chiếu dành cho công dân dưới 14 tuổi.',
    image: 'https://cdn.thuvienphapluat.vn/uploads/Hoidapphapluat/2023/CTV/11082023/cap-ho-chieu-duoi-14t-trong-nuoc.jpg',
    category: 'lanh_su'
  },
  {
    title: 'Tờ khai tờ khai lý lịch tư pháp',
    link: '/dang-ky/to-khai-ly-lich-tu-phap',
    description: 'Mẫu tờ khai xin cấp lý lịch tư pháp cá nhân.',
    image: 'https://aztax.com.vn/wp-content/uploads/2024/06/mau-to-khai-yeu-cau-cap-phieu-ly-lich-tu-phap-so-1.jpg',
    category: 'lanh_su'
  },
  {
    title: 'Tờ khai quốc tịch Việt Nam',
    link: '/dang-ky/to-khai-quoc-tich-viet-nam',
    description: 'Tờ khai xin cấp, đăng ký quốc tịch Việt Nam.',
    image: 'https://image.nhigia.vn//TIN_TUC/to-khai-dang-ky-xac-dinh-co-quoc-tich-viet-nam-min.jpg',
    category: 'lanh_su'
  },
  {
    title: 'Tờ khai xác nhận tạm trú thường trú',
    link: '/dang-ky/xac-nhan-tam-tru-thuong-tru',
    description: 'Mẫu tờ khai xác nhận thông tin tạm trú hoặc thường trú.',
    image: 'https://gvlawyers.com.vn/wp-content/uploads/2024/06/Mau-don-xin-xac-nhan-tam-tru-3.png',
    category: 'lanh_su'
  },
  {
    title: 'Tờ khai miễn thị thực',
    link: '/dang-ky/mien-thi-thuc',
    description: 'Tờ khai đăng ký miễn thị thực nhập cảnh Việt Nam.',
    image: 'https://cdn.thuvienphapluat.vn//phap-luat/2022-2/TV/231003/mau-na9.jpg',
    category: 'lanh_su'
  },
  {
    title: 'Tờ khai đăng kí khai sinh cho trẻ em ở nước ngoài (chưa có giấy khai sinh của nước ngoài)',
    link: '/dang-ky/giay-khai-sinh-tre-em-viet-nam-o-nuoc-ngoai',
    description: 'Mẫu tờ khai cấp giấy khai sinh cho trẻ em Việt Nam sinh ở nước ngoài.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8v_fXUeNWmrt7Qi5_otM3mBc3Hvp_eySsWg&s',
    category: 'lanh_su'
  },
  {
    title: 'Tờ khai đăng ký ghi vào hộ tịch khai sinh (đã có giấy khai sinh của nước ngoài)',
    link: '/dang-ky/to-khai-xin-cap-khai-sinh',
    description: 'Tờ khai đăng ký xin cấp giấy khai sinh lần đầu.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPRnMRwagoJYERBccGa8Farw6EAOUYWSdAKw&s',
    category: 'lanh_su'
  },
  {
    title: 'Tờ khai 888',
    link: '/dang-ky/form888',
    description: 'Mẫu form 888 sử dụng trong hồ sơ visa Úc xác nhận mối quan hệ.',
    image: 'https://cdn.prod.website-files.com/67c8c79820cc5d8c595f8fdf/67c8c79820cc5d8c595f9b7a_678d7bcd8ab3dbabd42f5885_678d7bb8f4c0d53168f478a2_Form%252520888%252520Doc.jpeg',
    category: 'di_tru'
  },
  {
    title: 'Tờ khai 80',
    link: '/dang-ky/form80',
    description: 'Mẫu form 80 khai báo thông tin cá nhân cho visa Úc.',
    image: 'https://bankervn.com/wp-content/uploads/2018/04/01.jpg.webp',
    category: 'di_tru'
  },
  {
    title: 'Genuine Student',
    link: '/genuinestudent',
    description: 'Tờ khai xác nhận học sinh sinh viên chính thức cho visa du học.',
    image: 'https://www.studylink.org/vnt_upload/news/06_2024/Thumbnail_GS_1.png',
    category: 'di_tru'
  },
  {
    title: 'Tờ khai chưa bảo lãnh',
    link: '/dangkychubaolanh',
    description: 'Tờ khai dành cho trường hợp chưa có người bảo lãnh.',
    image: 'https://sanketoan.vn/public/library/images/file%20m%E1%BA%ABu%20ch%E1%BB%A9ng%20t%E1%BB%AB%2C%20b%C3%A1o%20c%C3%A1o/0601/1(16).PNG',
    category: 'lanh_su'
  },
  {
    title: 'Visa 600',
    link: '/dang-ky/visa600',
    description: 'Tờ khai đăng ký visa 600 dành cho du lịch hoặc thăm thân Úc.',
    image: 'https://duhocnghe24h.vn/upload/files/images/fullsize/2024/01/09/visa-600-australia.jpg',
    category: 'di_tru'
  },
  {
    title: 'Tờ khai số hộ tịch và khai sinh',
    link: '/dang-ky/to-khai-so-ho-tich-va-khai-sinh',
    description: 'Mẫu tờ khai liên quan đến số hộ tịch và khai sinh.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVHcS33hY7_k0-Ea-rybEgPwF3Bw-b9Z_PoA&s',
    category: 'lanh_su'
  },
  {
    title: 'Danh sách tay thẻ có TOL-CSOL',
    link: '/danh-sach-tay-the-co-tol-csol',
    description: 'Danh sách tay thẻ có thông tin TOL-CSOL phục vụ tra cứu.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRglXO4Vmxs_-i2eJp9sBiI4A_q9r4D_VL4g&s',
    category: 'di_tru'
  },
  {
    title: 'Giấy ủy quyền',
    link: '/dang-ky/giay-uy-quyen',
    description: 'Mẫu giấy ủy quyền pháp lý cho các thủ tục liên quan.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlp87111Fy0Dz-3iQiL2ui3kpbVoUYhmHk_g&s',
    category: 'lanh_su'
  },
  {
    title: 'Tờ khai mối quan hệ vợ chồng',
    link: '/dang-ky/moi-quan-he-vo-chong',
    description: 'Tờ khai xác nhận mối quan hệ hôn nhân giữa vợ chồng.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs5wxa_hIi7ljY6DQUFXciMLuWQr3GttnAOA&s',
    category: 'lanh_su'
  }
];

get lanhSuForms() {
  return this.filteredForms.filter(f => f.category === 'lanh_su');
}

get diTruForms() {
  return this.filteredForms.filter(f => f.category === 'di_tru');
}


  get filteredForms() {
    return this.routeList.filter(f =>
      f.title.toLowerCase().includes(this.search.toLowerCase()) ||
      f.description.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
