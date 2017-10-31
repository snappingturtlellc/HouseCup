import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { MemberService } from '../../shared/service/member.service';
import { IMember } from '../../shared/class/member';
import { AppHeaderService } from '../../shared/widget/app-header/app-header.service';

@Component({
  selector: 'gls-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss']
})
export class MembersPageComponent implements OnInit {

  members$: FirebaseListObservable<any[]> = null;;
  selectedIndex: number = -1;

  constructor(private appHeaderService: AppHeaderService, private router: Router, private memberService: MemberService) { }

  ngOnInit() {
    this.appHeaderService.reset();
    this.appHeaderService.pageName = "Members";
    this.members$ = this.memberService.getAll();
  }

  showMenu(index: number) {
    if (this.selectedIndex == index)
      this.selectedIndex = -1;
    else
      this.selectedIndex = index;
  }

  add() {
    this.router.navigate(['/memberdetails/new']);
  }
  delete(member: IMember) {
    this.memberService.delete(member);
  }
  edit(member: IMember) {
    this.router.navigate(['/memberdetails/' + member.$key]);
  }
}
