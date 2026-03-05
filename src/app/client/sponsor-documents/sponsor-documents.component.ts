import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DocumentItem {
  title: string;
  description: string[];
  notes?: string[];
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  purpose?: string;
  items: DocumentItem[];
  subsections?: {
    title: string;
    items: DocumentItem[];
  }[];
}

@Component({
  selector: 'app-sponsor-documents',
  standalone: false,
  templateUrl: './sponsor-documents.component.html',
  styleUrls: ['./sponsor-documents.component.scss']
})
export class SponsorDocumentsComponent {
  pageTitle = 'Danh sách giấy tờ cần cung cấp của người bảo lãnh đương đơn visa 600';
  pageSubtitle = 'Đây là danh sách hồ sơ chi tiết dành cho Người bảo lãnh (Sponsor).';

  sections: Section[] = [
    {
      id: 'identity',
      title: 'GIẤY TỜ NHÂN THÂN & CƯ TRÚ',
      subtitle: 'IDENTITY & STATUS',
      icon: 'person',
      purpose: 'Chứng minh người bảo lãnh là công dân/thường trú nhân Úc và đang sống ổn định (Settled) tại Úc.',
      items: [
        {
          title: 'Hộ chiếu Úc (Australian Passport)',
          description: [
            'Scan trang có ảnh.',
            'Hoặc nếu chưa có hộ chiếu Úc: Scan Hộ chiếu nước ngoài + Giấy cấp quốc tịch (Citizenship Certificate) hoặc Visa Thường trú (PR Grant Letter/VEVO Check).'
          ]
        },
        {
          title: 'Giấy khai sinh (Birth Certificate)',
          description: [
            'Bắt buộc nộp để đối chiếu mối quan hệ với đương đơn. Ví dụ: Nếu bảo lãnh em gái, phải nộp khai sinh của mình để thấy tên cha mẹ trùng khớp với khai sinh của em gái.'
          ]
        },
        {
          title: 'Giấy đổi tên (Change of Name Certificate)',
          description: [
            'Nếu có: Nếu tên hiện tại trên giấy tờ Úc khác với tên trên giấy khai sinh cũ.'
          ]
        },
        {
          title: 'Bằng chứng cư trú (Proof of Address)',
          description: [
            'Giấy phép lái xe (Driver Licence) mặt trước và sau.',
            'Hóa đơn điện/nước/gas/internet (Utility Bills) có tên và địa chỉ người bảo lãnh (trong 3 tháng gần nhất).'
          ]
        }
      ]
    },
    {
      id: 'financial',
      title: 'TÀI CHÍNH & THU NHẬP',
      subtitle: 'FINANCIAL CAPACITY',
      icon: 'account_balance',
      purpose: 'Người bảo lãnh cần chứng minh đủ khả năng lo ăn ở cho khách và đủ tiền đóng Bond (từ $5,000 - $15,000 AUD) nếu bị Bộ Di trú yêu cầu.',
      items: [
        {
          title: 'Notice of Assessment (NOA)',
          description: [
            'Giấy báo thuế của Sở Thuế vụ Úc (ATO) trong năm tài chính gần nhất. Đây là bằng chứng quan trọng nhất về thu nhập hợp pháp.'
          ]
        },
        {
          title: 'Payslips (Phiếu lương)',
          description: [
            '02 - 03 phiếu lương gần nhất (Year-to-date).'
          ]
        },
        {
          title: 'Thư xác nhận việc làm (Employment Letter)',
          description: [
            'Do công ty cấp, ghi rõ chức vụ, thời gian làm việc, mức lương và loại hợp đồng (Full-time/Part-time).'
          ]
        },
        {
          title: 'Sao kê ngân hàng (Bank Statement)',
          description: [
            'Sao kê 3 tháng gần nhất của tài khoản nhận lương hoặc tài khoản tiết kiệm.',
            'Số dư khuyến nghị: Nên có sẵn khoản dư trên $5,000 - $10,000 AUD để chứng minh nếu Lãnh sự quán yêu cầu đóng tiền cọc (Security Bond) thì có tiền đóng ngay.'
          ]
        }
      ],
      subsections: [
        {
          title: 'Nếu là chủ doanh nghiệp (Self-employed)',
          items: [
            {
              title: 'Giấy đăng ký kinh doanh (ABN/ASIC registration)',
              description: []
            },
            {
              title: 'Báo cáo hoạt động kinh doanh (BAS)',
              description: ['2 quý gần nhất.']
            }
          ]
        }
      ]
    },
    {
      id: 'accommodation',
      title: 'CHỖ Ở',
      subtitle: 'ACCOMMODATION',
      icon: 'home',
      purpose: 'Chứng minh người được bảo lãnh sang sẽ có chỗ ở đàng hoàng, không trở thành gánh nặng xã hội',
      items: [
        {
          title: 'Nếu sở hữu nhà',
          description: [
            'Giấy đóng thuế đất (Council Rates Notice) năm hiện tại.',
            'Hoặc Giấy sao kê tiền trả góp nhà (Mortgage Statement).'
          ]
        },
        {
          title: 'Nếu đang thuê nhà',
          description: [
            'Hợp đồng thuê nhà (Tenancy Agreement/Lease) còn hạn.',
            'Lưu ý: Hợp đồng phải cho phép số người cư trú phù hợp. Nếu nhà quá nhỏ hoặc hợp đồng cấm ở thêm người, hồ sơ sẽ bị yếu.'
          ]
        }
      ]
    },
    {
      id: 'invitation',
      title: 'THƯ MỜI & CAM KẾT',
      subtitle: 'INVITATION & COMMITMENT',
      icon: 'mail',
      items: [
        {
          title: 'Thư mời (Invitation Letter)',
          description: [
            'Viết bằng tiếng Anh, ký tên.',
            'Nội dung: Tôi tên là..., mời sang chơi từ ngày... đến ngày... Mục đích là thăm thân/du lịch. Tôi cam kết đài thọ chi phí ăn ở (nếu có) và đảm bảo người thân tuân thủ luật pháp Úc và về nước đúng hạn.'
          ]
        },
        {
          title: 'Statutory Declaration (Khuyên dùng)',
          description: [
            'Thay vì viết thư tay bình thường, người bảo lãnh nên làm bản Tuyên thệ (Statutory Declaration) trước mặt Dược sĩ, Cảnh sát hoặc JP (Justice of the Peace).',
            'Văn bản này có giá trị pháp lý cao hơn thư mời thông thường, khẳng định sự nghiêm túc trong việc bảo lãnh.'
          ]
        }
      ]
    },
    {
      id: 'notes',
      title: 'MỘT SỐ LƯU Ý RIÊNG CHO SPONSOR',
      subtitle: 'SPECIAL NOTES FOR SPONSOR',
      icon: 'info',
      items: [
        {
          title: 'Tiền Bond (Security Bond)',
          description: [
            'Hãy dặn người bảo lãnh chuẩn bị tâm lý có thể nhận được email yêu cầu đóng Bond (thường là $5,000 - $15,000 AUD cho mỗi người lớn). Tiền này sẽ được trả lại sau khi người thân về Việt Nam. Nếu không có tiền đóng Bond khi được yêu cầu, visa sẽ bị từ chối.'
          ]
        },
        {
          title: 'Kiểm tra tư cách',
          description: [
            'Nếu người bảo lãnh đã từng bảo lãnh ai đó trước đây mà người đó trốn ở lại Úc hoặc vi phạm visa, họ có thể bị cấm bảo lãnh người mới trong vòng 5 năm.'
          ]
        }
      ]
    }
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

