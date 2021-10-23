import { Injectable } from '@angular/core';
import { Posts } from './posts';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Posts[] = [];
  private postsUpdated = new Subject<Posts[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Posts = {
      title: title,
      content: content,
      dateCreated: new Date(),
    };

    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

  constructor() { }
}
