import { Injectable } from '@angular/core';
import { Post } from '../Post';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  allPosts: Observable<Post[]> | undefined;
  categories = [
    {value: 'Web-Development', viewValue: 'Web Development'},
    {value: 'Android-Development', viewValue: 'Android Development'},
    {value: 'IOS-Development', viewValue: 'IOS Development'}
  ];

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) {
  }

  getData(): Observable<Post[]> {
    this.allPosts = this.http.get<Post[]>('api/Home/GetAllArticle');
    return this.allPosts;
  }

  getArticle(index: number): Observable<Post> {
    return this.http.get<Post>(`api/Home/GetArticle/${index}`);
  }

  getCategories() {
    return this.categories;
  }

  addPost(data: Post) {
    return this.http.post<Post>('api/Home/AddArticle', data);
  }

  editPost(id: number, data: Post) {
    return this.http.put<Post>(`api/Home/UpdateArticle/${id}`, data);
  }

  deletePost(index: number) {
    return this.http.delete<Post>(`api/Home/DeleteArticle/${index}`);
  }

  public getClaims = () => {
    return this.http.get('api/Accounts/Privacy/Privacy');
  }

  // private createCompleteRoute = (route: string, envAddress: string) => {
  //   return `${envAddress}/${route}`;
  // }
}
