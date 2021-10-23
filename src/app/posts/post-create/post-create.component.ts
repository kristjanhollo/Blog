import { Component, OnInit, Output } from '@angular/core';
import { Posts } from '../posts';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
  }

  @Output() postCreated = new EventEmitter<Posts>();

  onAddPost(form: NgForm):void {
    if(form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
    
  }


}
