import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../Post';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})

export class PostDialogComponent {
  public dataArticle: Observable<Post> | undefined
  public idArticle: number | undefined
  errorMessage = '';

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

    if (this.idArticle) {
      this.dataService.editPost(this.idArticle, this.blogPost).subscribe();
    } else {
      this.dataService.addPost(this.blogPost).subscribe();
    }
    
    this.router.navigateByUrl('/dashboard');
  }

  categories = this.dataService.getCategories();
}
