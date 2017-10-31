import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/service/user.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Route, Router } from '@angular/router';
import { IUser } from 'app/shared/class/user';

@Component({
  selector: 'gls-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  
    users$: FirebaseListObservable<any[]> = null;;  
  
    constructor(private router: Router, private userService: UserService) { }
  
    ngOnInit() {
      this.users$ = this.userService.getAll();
    }
  
    add() {
      this.router.navigate(['/userdetails/new']);
    }
    delete(user: IUser) {
      this.userService.delete(user);
    }
    edit(user: IUser) {
      this.router.navigate(['/userdetails/' + user.$key]);
    }
  }
  