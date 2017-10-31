// system
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

// firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

// app
import { AppComponent } from './app.component';

// component
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { SigninPageComponent } from './auth/signin-page/signin-page.component';
import { UsersPageComponent } from './user/users-page/users-page.component';
import { UserDetailsPageComponent } from './user/user-details-page/user-details-page.component';
import { AccountsPageComponent } from './account/accounts-page/accounts-page.component';
import { AccountDetailsPageComponent } from './account/account-details-page/account-details-page.component';
import { MembersPageComponent } from './member/members-page/members-page.component';
import { MemberDetailsPageComponent } from './member/member-details-page/member-details-page.component';
import { TeamsPageComponent } from './team/teams-page/teams-page.component';
import { TeamDetailsPageComponent } from './team/team-details-page/team-details-page.component';
import { ChallengesPageComponent } from './challenge/challenges-page/challenges-page.component';
import { ChallengeDetailsPageComponent } from './challenge/challenge-details-page/challenge-details-page.component';

// service
import { AuthService } from './shared/service/auth.service';
import { UserService } from './shared/service/user.service';
import { MemberService } from './shared/service/member.service';
import { TeamService } from './shared/service/team.service';
import { ChallengeService } from './shared/service/challenge.service';
import { AccountService } from './shared/service/account.service';
import { FeatureMenuComponent } from './shared/widget/feature-menu/feature-menu.component';
import { AppHeaderComponent } from './shared/widget/app-header/app-header.component';
import { FeedPageComponent } from './feed/feed-page/feed-page.component';
import { PlayersPageComponent } from './player/players-page/players-page.component';
import { MemberGalleryComponent } from './feed/widget/member-gallery/member-gallery.component';
import { PostInputComponent } from './feed/widget/post-input/post-input.component';
import { EarnedPointsComponent } from './feed/card/earned-points/earned-points.component';
import { FirebaseHelperService } from './shared/service/firebase-helper.service';
import { AppHeaderService } from './shared/widget/app-header/app-header.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupPageComponent,
    SigninPageComponent,
    UsersPageComponent,
    UserDetailsPageComponent,
    AccountsPageComponent,
    AccountDetailsPageComponent,
    MembersPageComponent,
    MemberDetailsPageComponent,
    TeamsPageComponent,
    TeamDetailsPageComponent,
    ChallengesPageComponent,
    ChallengeDetailsPageComponent,
    FeatureMenuComponent,
    AppHeaderComponent,
    FeedPageComponent,
    PlayersPageComponent,
    MemberGalleryComponent,
    PostInputComponent,
    EarnedPointsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    AngularFireDatabase,
    AuthService,
    UserService,
    AccountService,
    MemberService,
    TeamService,
    ChallengeService,
    FirebaseHelperService,
    AppHeaderService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
