import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Member } from '../../shared/class/member';
import { MemberService } from '../../shared/service/member.service';

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
      private router: Router,
      private activatedRoute: ActivatedRoute, 
      private af: AngularFireDatabase, 
      private memberService: MemberService) { 
        console.log("MemberDetailsPageComponent:constructor");
        
      }

  ngOnInit() {
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
      // this.memberService.get(id);
      console.log("got member info")
      this.memberService.getSnapshot(id).subscribe(u => {
        this.member = u;
      });
    }    
  }

  add() {
    this.memberService.add(this.member);
    this.router.navigate(['/members']);    
  }

  edit() {
    this.memberService.update(this.member);
    this.router.navigate(['/members']);
  }
}
