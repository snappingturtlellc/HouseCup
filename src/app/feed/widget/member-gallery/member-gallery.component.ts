import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../shared/service/member.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'gls-member-gallery',
  templateUrl: './member-gallery.component.html',
  styleUrls: ['./member-gallery.component.scss']
})
export class MemberGalleryComponent implements OnInit {

  members$: FirebaseListObservable<any[]> = null;;

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.members$ = this.memberService.getAll();    
  }

}
