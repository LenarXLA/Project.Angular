import { Component } from '@angular/core';
import { DataService } from '../data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../Post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-article-page',
  templateUrl: './main-article-page.component.html',
  styleUrls: ['./main-article-page.component.css'],
})

export class MainArticlePageComponent {
  public idArticle!: number;
  public dataArticle: Observable<Post> | undefined
  constructor(
      private dataService: DataService,
      private route: ActivatedRoute,
      private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idArticle = params['id'];
      this.dataArticle = this.dataService.getArticle(this.idArticle);
    });
  }

  deletePost() {
    this.dataService.deletePost(this.idArticle).subscribe(() => {
      this.router.navigateByUrl('/dashboard');
    });
  }

  editPost() {
    this.router.navigateByUrl('/addPost', { state: { id: this.idArticle } });
  }
}
