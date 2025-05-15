import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

declare var $: any;

export class Posts {
  title: string = '';
  id_select: string = '';
  id_select_types : string = '' ;
  image: string = '';
  content: string = '';
  outstanding: boolean = false;
  link : string = '' ;
}

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.scss']
})
export class AddnewsComponent {

  html: any = '';
  htmlContent: string = '';
  listselectdanhmuc: any = [];
  listselecttheloai : any = [] ;
  isLoading: boolean = true;
  post: Posts = new Posts();
  selectedFile : File | undefined ;

  constructor(private api: ApiService, public sanitizer: DomSanitizer , private data : DataService) { }

  async ngOnInit(): Promise<any> {
    this.getSelect();
    this.getSelectTypes() ;
  }

  public Editor = DecoupledEditor;

  public onReady( editor: DecoupledEditor ): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }



  onEditorContentChange(event: any) {
    this.post.content = event.html;
    console.log(this.post.content);
  }



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }



  async getSelect(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listcategory')).subscribe(
        (v: any) => {
          this.listselectdanhmuc = v;
          this.isLoading = false;
          console.log(this.listselectdanhmuc);
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  };

  async getSelectTypes(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listtypes')).subscribe(
        (v: any) => {
          this.listselecttheloai = v;
          this.isLoading = false;
          console.log(this.listselecttheloai);
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  };


  async submit(data: NgForm) {
    if (data.valid) {
      // this.isLoading = true;
      const formData = new FormData();
      formData.append('title' , this.post.title);
      formData.append('description' , this.post.content);
      formData.append('link' , this.post.link);
      formData.append('category_id' , this.post.id_select);
      formData.append('type_id' , this.post.id_select_types);
      formData.append('image' , this.selectedFile ?? '');
      formData.append('outstanding' , this.post.outstanding.toString() );

      // const post_r = {
      //   title: this.post.title,
      //   description: this.post.content,
      //   link : this.post.link ,
      //   category_id: this.post.id_select,
      //   image: this.post.image,
      //   outstanding: this.post.outstanding
      // };
      // console.log(post_r);

      (await this.api.post("/addnew", formData)).subscribe(
        (v: any) => {
          if(v.status == 200) {
            this.data.notification('Thêm bài viết thành công' , 'Bài viết đã được thêm thành công' , 'success');
            this.post = new Posts();
          } else {
            this.data.notification('Thêm bài viết thất bại' , 'Bài viết đã được thêm thất bại' , 'error');
          }

          // this.toastr.success('Thêm bài viết thành công', `Bài viết mới đã được thêm`);
        },
        (err: any) => {
          this.isLoading = false;
          // this.toastr.error('Thêm bài viết thất bại', 'Vui lòng kiểm tra kết nối');
        })

    }
  }
}
