import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../shared/class/member';
import { MemberService } from '../../shared/service/member.service';
import { Location } from '@angular/common';
import { AppService } from '../../shared/service/app.service';

@Component({
  selector: 'gls-member-details-page',
  templateUrl: './member-details-page.component.html',
  styleUrls: ['./member-details-page.component.scss']
})
export class MemberDetailsPageComponent implements OnInit {

  isNew: boolean = false;
  memberId: string;
  member: Member = new Member({});

  constructor(
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
    private location: Location) {
    console.log("MemberDetailsPageComponent:constructor");

  }

  async ngOnInit() {
    console.log("MemberDetailsPageComponent:ngOnInit");
    let id = this.activatedRoute.snapshot.params['id'];
    if (id == 'new') {
      this.isNew = true;
      this.memberId = 'new';
      this.member = new Member({});
    }
    else {
      this.isNew = false;
      this.memberId = id;
      this.member = await this.memberService.get(id);
    }
  }

  add() {
    this.memberService.add(this.member);
    this.location.back();
  }

  async edit() {
    await this.memberService.update(this.member);
    this.location.back();
  }

  delete() {
    this.memberService.delete(this.member);
    this.location.back();
  }

}
