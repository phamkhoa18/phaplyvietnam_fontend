import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AdminModule } from '../../admin.module';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';


declare var $: any;

export class Posts {
  _id : string = '' ;
  title: string = '';
  id_select: string = '';
  image: string = '';
  content: string = '';
  outstanding: boolean = false;
  id_select_types : string = '' ;
  link : string = '' ;
}
@Component({
  selector: 'app-editnews',
  templateUrl: './editnews.component.html',
  styleUrls: ['./editnews.component.scss']
})
export class EditnewsComponent {
  html: any = '';
  htmlContent: string = '';
  listselectdanhmuc: any = [];
  listselecttheloai : any = [] ;
  isLoading: boolean = true;
  item : any ;
  selectedFile : File | undefined ;
  post: Posts = new Posts();

  constructor(public api: ApiService, public sanitizer: DomSanitizer, private data : DataService , private route : ActivatedRoute) { }

  async ngOnInit(): Promise<any> {
    const myId = this.route.snapshot.paramMap.get('id');
    this.getSelect();
    this.getSelectTypes() ;
    this.getData(myId) ;
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

  log() {
    console.log(this.post.content);

  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }


  async getSelect() {
      (await this.api.get('/listcategory')).subscribe(
        (v: any) => {
          this.listselectdanhmuc = v;
          this.isLoading = false;
        },
        (error: any) => {
          console.error(error);
        }
      );
  };

  async getSelectTypes() {
      (await this.api.get('/listtypes')).subscribe(
        (v: any) => {
          this.listselecttheloai = v;
          this.isLoading = false;
          console.log(this.listselecttheloai);
        },
        (error: any) => {
          console.error(error);
        }
      );

  };

  async getData(id : any ){
      (await this.api.get('/listnew_id/' + id )).subscribe((v : any ) => {
          const post_r = {
            _id : v._id ,
            title: v.title,
            content: v.description,
            link : v.link,
            id_select: v.category_id,
            id_select_types : v.type_id ,
            image: v.image,
            outstanding: v.outstanding
          };
          this.post = post_r ;
          this.isLoading = false ;
      })
  }

  async submit(data: NgForm) {
    if (data.valid) {
      this.isLoading = true;
      // 2 trường xảy ra
        // 1. sửa nhưng ko đổi ảnh
        if(!this.selectedFile) {
          const post_r = {
            _id : this.post._id ,
            title: this.post.title,
            description: this.post.content,
            link : this.post.link ,
            category_id: this.post.id_select,
            type_id : this.post.id_select_types,
            image: this.post.image,
            outstanding: this.post.outstanding
          };
          (await this.api.post("/updatenew", post_r)).subscribe(
            (v: any) => {
              if(v.status == 200) {
                this.data.notification('Sửa bài viết thành công' , 'Đã sửa bài viết thành công' , 'success');
              } else {
                this.data.notification('Sửa bài viết thất bại' , 'Đã sửa bài viết thất bại' , 'error');
              }
              this.isLoading = false ;
            })
        }else {
          const formData = new FormData();
          formData.append('_id' , this.post._id);
          formData.append('title' , this.post.title);
          formData.append('description' , this.post.content);
          formData.append('link' , this.post.link);
          formData.append('category_id' , this.post.id_select);
          formData.append('type_id' , this.post.id_select_types);
          formData.append('image' , this.selectedFile ?? '');
          formData.append('outstanding' , this.post.outstanding.toString() );

          (await this.api.post("/updatenew_image", formData)).subscribe(
            (v: any) => {
              console.log(v);

              if(v.status == 200) {
                  this.data.notification('Sửa bài viết thành công' , 'Đã sửa bài viết thành công' , 'success');
              } else {
                this.data.notification('Sửa bài viết thất bại' , 'Đã sửa bài viết thất bại' , 'error');
              }
              this.isLoading = false ;
            })
        }

        // 2. đổi ảnh

    }
  }

}
