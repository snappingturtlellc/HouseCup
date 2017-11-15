import { Component } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AppService } from '../../../shared/service/app.service';
import { IMember } from '../../../shared/class/member';

@Component({
  selector: 'gls-member-gallery',
  templateUrl: './member-gallery.component.html',
  styleUrls: ['./member-gallery.component.scss']
})
export class MemberGalleryComponent {

  constructor(
    private appService: AppService,
    private router: Router) { }

  goMembers() {
    this.router.navigate(['/members']);
  }

  addPoints(member: IMember) {
    this.appService.showPointsDialog(member);
  }
}
