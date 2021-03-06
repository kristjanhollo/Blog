import { Injectable } from '@angular/core';
import { Posts } from './posts';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Posts[] = [];
  private postsUpdated = new Subject<Posts[]>();

  constructor(private http: HttpClient) {
  }

  getPosts() {
    this.http.get<{message: string, posts: Posts[]}>('http://localhost:3000/api/posts')
    .subscribe((postData) => {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Posts = {
      id: null,
      title: title,
      content: content,
      dateCreated: new Date(),
    };
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
    .subscribe((responeData) => {
      console.log(responeData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
    
  }

}
