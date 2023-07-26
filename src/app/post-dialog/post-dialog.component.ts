import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../Post';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})

export class PostDialogComponent {
  public dataArticle: Observable<Post> | undefined
  public idArticle: number | undefined
  errorMessage = '';
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  blogPost = {
    id: 0,
    title: '',
    author:'',
    content: '',
    date: new Date(),
    category: '',
  };

  constructor(
    public dataService: DataService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.editor = new Editor();

    this.idArticle = history.state.id;
    if (this.idArticle) {
      this.dataService.getArticle(this.idArticle).subscribe(article => {
        this.blogPost = article;
      });
    }
  }

  onNoClick(): void {
    this.router.navigateByUrl('/dashboard');
  }

  onSubmit(): void {

    if (!this.blogPost.title || !this.blogPost.content || !this.blogPost.category) {
      this.errorMessage = 'Пожалуйста заполните все необходимые поля.';
      return;
    }

    this.blogPost.author = localStorage.getItem("userName")!;

    if (this.idArticle) {
      this.dataService.editPost(this.idArticle, this.blogPost).subscribe();
    } else {
      this.dataService.addPost(this.blogPost).subscribe();
    }
    
    this.router.navigateByUrl('/dashboard');
  }

  categories = this.dataService.getCategories();

    // make sure to destory the editor
    ngOnDestroy(): void {
      this.editor.destroy();
    }
}
