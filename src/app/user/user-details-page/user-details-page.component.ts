import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'app/shared/class/user';
import { UserService } from 'app/shared/service/user.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'gls-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {
  
    isNew: boolean = false;
    userId: string;
    user: User = new User({});
  
    constructor(private activatedRoute: ActivatedRoute, private af: AngularFireDatabase, private userService: UserService) { 
      let id = this.activatedRoute.snapshot.params['id'];
      if (id == 'new') {
        this.isNew = true;
        this.userId = 'new';
        this.user = new User({});
      }
      else {
        this.isNew = false;      
        this.userId = id;
        this.userService.get(id);
        // this.userService.getSnapshot(id).subscribe(u => {
        //   this.user = u;
        // });
      }    
      
      this.user.email = "admin@housecup.com";
    }
  
    ngOnInit() {
    }
  
    add() {
      debugger
      this.userService.add(this.user);
    }
  
    edit() {
      debugger
      this.userService.update(this.user);
    }
  }
  