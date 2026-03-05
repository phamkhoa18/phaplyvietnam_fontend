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
  items: DocumentItem[];
  subsections?: {
    title: string;
    items: DocumentItem[];
  }[];
}

@Component({
  selector: 'app-visa600-guide',
  standalone: false,
  templateUrl: './visa600-guide.component.html',
  styleUrls: ['./visa600-guide.component.scss']
})
export class Visa600GuideComponent {
  sections: Section[] = [
    {
      id: 'identity',
      title: 'Giấy tờ nhân thân & Cư trú',
      subtitle: 'Identity & Residency',
      icon: 'person',
      items: [
        {
          title: 'Hộ chiếu (Passport)',
          description: [
            'Scan trang có ảnh, chữ ký và tất cả các trang có dấu mộc xuất nhập cảnh/visa của các nước khác (nếu có).',
            'Hộ chiếu phải còn hạn ít nhất 6 tháng tính từ ngày dự kiến rời Úc.'
          ]
        },
        {
          title: 'Ảnh thẻ (Soft copy)',
          description: [
            '1 file ảnh 4x6cm, nền trắng, chụp rõ mặt, không đeo kính, vén tóc lộ tai.',
            'Ảnh mới chụp trong 6 tháng.'
          ]
        },
        {
          title: 'Căn cước công dân (CCCD) gắn chip',
          description: [
            'Scan 2 mặt trên cùng 1 trang giấy.'
          ]
        },
        {
          title: 'Giấy khai sinh (Birth Certificate)',
          description: [
            'Bắt buộc để chứng minh ngày sinh và tên cha mẹ (dùng để đối chiếu mối quan hệ với người bảo lãnh).'
          ]
        },
        {
          title: 'Giấy xác nhận cư trú (Mẫu CT07) hoặc Sổ hộ khẩu',
          description: [
            'Hiện nay Úc chấp nhận CT07 (có xác nhận của công an phường) để thay thế sổ hộ khẩu giấy đã bỏ.',
            'Mục đích để chứng minh bạn có nơi thường trú ổn định tại Việt Nam.'
          ]
        },
        {
          title: 'Giấy đăng ký kết hôn (nếu đã kết hôn)',
          description: [
            'Chứng minh ràng buộc gia đình tại Việt Nam (lý do để quay về).'
          ],
          notes: [
            'Nếu đã ly hôn: Quyết định ly hôn của tòa án.',
            'Nếu độc thân: Không bắt buộc xin giấy xác nhận độc thân trừ khi Lãnh sự quán yêu cầu thêm.'
          ]
        }
      ]
    },
    {
      id: 'relationship',
      title: 'Chứng minh mối quan hệ',
      subtitle: 'Proof of Relationship',
      icon: 'people',
      items: [
        {
          title: 'Nguyên tắc "Chuỗi giấy tờ"',
          description: [
            'Nếu Người bảo lãnh là Anh/Chị/Em ruột: Nộp Giấy khai sinh của Đương đơn + Giấy khai sinh của Người bảo lãnh (để chứng minh cùng cha/mẹ).',
            'Nếu Người bảo lãnh là Cô/Dì/Chú/Bác:',
            '• Giấy khai sinh của Đương đơn (thể hiện tên Bố/Mẹ).',
            '• Giấy khai sinh của Bố/Mẹ Đương đơn (thể hiện tên Ông Bà).',
            '• Giấy khai sinh của Người bảo lãnh (thể hiện tên Ông Bà).',
            '• Kết luận: Bố/Mẹ đương đơn và Người bảo lãnh là anh em ruột => Suy ra quan hệ Cô/Cháu.'
          ]
        },
        {
          title: 'Hình ảnh bằng chứng (Social Evidence)',
          description: [
            'File ghép các ảnh chụp chung giữa Đương đơn và Người bảo lãnh qua các giai đoạn thời gian (ảnh gia đình, lễ tết, ảnh chụp màn hình gọi video call, lịch sử chat Zalo/Facebook...).'
          ]
        }
      ]
    },
    {
      id: 'employment',
      title: 'Chứng minh công việc',
      subtitle: 'Employment',
      icon: 'work',
      subsections: [
        {
          title: 'A. Nhân viên văn phòng/Công chức',
          items: [
            {
              title: 'Hợp đồng lao động',
              description: ['Hoặc Quyết định tuyển dụng/bổ nhiệm chức vụ.']
            },
            {
              title: 'Bảng lương',
              description: ['3 tháng gần nhất.']
            },
            {
              title: 'Sao kê tài khoản nhận lương',
              description: ['3-6 tháng gần nhất (highlight khoản lương nhận được).']
            },
            {
              title: 'Bảo hiểm xã hội (VssID)',
              description: [
                'Chụp màn hình ứng dụng VssID (gồm phần thông tin cá nhân và quá trình tham gia BHXH).',
                'Đây là bằng chứng rất uy tín với Lãnh sự Úc.'
              ]
            },
            {
              title: 'Đơn xin nghỉ phép',
              description: [
                'Viết bằng tiếng Anh hoặc song ngữ, ghi rõ thời gian nghỉ trùng với lịch trình đi Úc, cam kết quay lại làm việc, có chữ ký Giám đốc và dấu mộc tròn công ty.'
              ]
            }
          ]
        },
        {
          title: 'B. Chủ doanh nghiệp/Hộ kinh doanh cá thể',
          items: [
            {
              title: 'Giấy phép đăng ký kinh doanh',
              description: ['(Business License)']
            },
            {
              title: 'Tờ khai thuế',
              description: [
                'Thuế GTGT (VAT) hoặc Thuế thu nhập doanh nghiệp (CIT) của 3 quý hoặc 1 năm gần nhất.'
              ]
            },
            {
              title: 'Sao kê tài khoản công ty',
              description: ['3 tháng gần nhất.']
            }
          ]
        },
        {
          title: 'C. Người nghỉ hưu',
          items: [
            {
              title: 'Quyết định nghỉ hưu hoặc Thẻ hưu trí',
              description: []
            },
            {
              title: 'Sổ nhận lương hưu hoặc Sao kê tài khoản nhận lương hưu',
              description: []
            }
          ]
        },
        {
          title: 'D. Học sinh/Sinh viên',
          items: [
            {
              title: 'Thẻ học sinh/sinh viên',
              description: []
            },
            {
              title: 'Giấy xác nhận đang học tập',
              description: ['(Confirmation of Enrolment) có dấu nhà trường.']
            },
            {
              title: 'Đơn xin nghỉ học',
              description: ['(nếu đi trong năm học).']
            }
          ]
        },
        {
          title: 'E. Nghề tự do (Freelancer) hoặc kinh doanh online',
          items: [
            {
              title: 'Thư giải trình',
              description: ['(Explanation Letter) mô tả công việc.']
            },
            {
              title: 'Hình ảnh hoạt động kinh doanh',
              description: ['(Fanpage, cửa hàng, kho hàng...).']
            },
            {
              title: 'Sao kê tài khoản cá nhân',
              description: ['Thể hiện giao dịch bán hàng/nhận tiền thù lao.']
            }
          ]
        }
      ],
      items: []
    },
    {
      id: 'financial',
      title: 'Tài chính & Tài sản',
      subtitle: 'Financial & Assets',
      icon: 'account_balance',
      items: [
        {
          title: 'Sổ tiết kiệm (Savings Book)',
          description: [
            'Scan mặt sổ gốc và Giấy xác nhận số dư (Balance Certificate) song ngữ của ngân hàng.',
            'Số tiền: Nên từ 100.000.000 VND – 200.000.000 VND (tương đương 5.000 – 10.000 AUD).'
          ],
          notes: [
            'Sổ nên gửi trước thời điểm nộp hồ sơ ít nhất 1-3 tháng. Nếu mới gửi sát ngày, cần giải trình nguồn tiền.'
          ]
        },
        {
          title: 'Sao kê tài khoản thanh toán',
          description: [
            '3-6 tháng gần nhất để thấy dòng tiền chi tiêu sinh hoạt hàng ngày.'
          ]
        },
        {
          title: 'Giấy chứng nhận quyền sử dụng đất (Sổ đỏ/Sổ hồng)',
          description: [
            'Scan đầy đủ các trang (bao gồm trang bổ sung biến động nếu có).'
          ]
        },
        {
          title: 'Đăng ký xe ô tô',
          description: ['(Cà vẹt xe)']
        },
        {
          title: 'Tài sản khác (nếu có)',
          description: [
            'Hợp đồng cho thuê nhà, Hợp đồng bảo hiểm nhân thọ (trang xác nhận đóng phí), Cổ phiếu/Trái phiếu.'
          ]
        }
      ]
    },
    {
      id: 'additional',
      title: 'Các giấy tờ khác',
      subtitle: 'Additional Documents',
      icon: 'description',
      subsections: [
        {
          title: 'Đối với trẻ em dưới 18 tuổi đi cùng',
          items: [
            {
              title: 'Form 1229',
              description: [
                'Đơn đồng ý cho trẻ đi du lịch (nếu chỉ đi cùng Bố hoặc Mẹ, thì người còn lại phải ký form này và cung cấp CCCD/Passport của người đó để đối chiếu chữ ký).'
              ]
            },
            {
              title: 'Giấy khai sinh của trẻ',
              description: []
            },
            {
              title: 'Xác nhận của trường học',
              description: ['Cho phép nghỉ học đi du lịch.']
            }
          ]
        },
        {
          title: 'Đối với người lớn tuổi (thường là trên 75 tuổi)',
          items: [
            {
              title: 'Khám sức khỏe',
              description: [
                'Chuẩn bị sẵn tinh thần sẽ bị yêu cầu Khám sức khỏe tại phòng khám do Lãnh sự chỉ định (IOM).'
              ]
            },
            {
              title: 'Bảo hiểm y tế du lịch',
              description: [
                'Bắt buộc mua Bảo hiểm y tế du lịch (Health Insurance) cho toàn bộ chuyến đi sau khi nộp hồ sơ.'
              ]
            }
          ]
        }
      ],
      items: []
    }
  ];

  scanningNotes: string[] = [
    'Không scan bị mất góc, mờ chữ.',
    'Các giấy tờ tiếng Việt công chứng dịch thuật phải scan cả bản tiếng Việt và bản tiếng Anh gộp chung vào 1 file PDF (Tiếng Việt trước, Tiếng Anh sau).'
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

