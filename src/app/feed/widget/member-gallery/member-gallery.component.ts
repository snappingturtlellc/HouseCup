import { Component, OnInit, OnChanges } from '@angular/core';
import { MemberService } from '../../../shared/service/member.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { IMember } from '../../../shared/class/member';
import { Router } from '@angular/router';
import { HouseService } from '../../../shared/service/house.service';
import { AppService } from '../../../shared/service/app.service';
import { IUser } from '../../../shared/class/user';

@Component({
  selector: 'gls-member-gallery',
  templateUrl: './member-gallery.component.html',
  styleUrls: ['./member-gallery.component.scss']
})
export class MemberGalleryComponent implements OnInit {

  members$: FirebaseListObservable<any[]> = null;
  users: IUser[] = [];

  constructor(
    private memberService: MemberService,
    private appService: AppService,
    private houseService: HouseService,
    private router: Router) { }

  ngOnInit() {
    this.appService.houseObservable.subscribe(house => {
      console.log("house change detected" + (house != null))
      this.loadMembers();
    });

    setTimeout(() => {
      this.loadMembers();      
    });
  }

  loadMembers() {
    console.log("load members: " + (this.appService.house != null))
    if (this.appService.house) {
      if (this.members$ == null)
        this.members$ = this.memberService.getAll();
    }
    else {
      this.members$ = null;
    }
  }

  add() {
    this.router.navigate(['/member', 'new']);
  }

  edit(member: IMember) {
    this.router.navigate(['/member', member.$key]);
  }
}
