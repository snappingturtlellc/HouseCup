import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninPageComponent } from './auth/signin-page/signin-page.component';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { UserDetailsPageComponent } from './user/user-details-page/user-details-page.component';
import { UsersPageComponent } from './user/users-page/users-page.component';
import { MembersPageComponent } from './member/members-page/members-page.component';
import { TeamsPageComponent } from './team/teams-page/teams-page.component';
import { ChallengesPageComponent } from './challenge/challenges-page/challenges-page.component';
import { FeedPageComponent } from './feed/feed-page/feed-page.component';
import { PlayersPageComponent } from './player/players-page/players-page.component';
import { MemberDetailsPageComponent } from './member/member-details-page/member-details-page.component';
import { RouterAuthService } from './shared/service/router-auth.service';
import { TestPageComponent } from './test/test-page/test-page.component';
import { ChallengeDetailsPageComponent } from './challenge/challenge-details-page/challenge-details-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SigninPageComponent
  },
  {
    path: 'signin',
    component: SigninPageComponent
  },
  {
    path: 'signup',
    component: SignupPageComponent
  },
  {
    path: 'userdetails/:id',
    component: UserDetailsPageComponent
  },  
  {
    path: 'users',
    component: UsersPageComponent
  },
  {
    path: 'members',
    component: MembersPageComponent
  },
  {
    path: 'member/:id',
    component: MemberDetailsPageComponent
  },
  {
    path: 'teams',
    component: TeamsPageComponent
  },
  {
    path: 'challenges',
    component: ChallengesPageComponent
  },
  {
    path: 'challenge/:id',
    component: ChallengeDetailsPageComponent
  },
  {
    path: 'feed',
    component: FeedPageComponent,
    //canActivate: [RouterAuthService]
  },
  {
    path: 'players',
    component: PlayersPageComponent

  },
  {
    path: 'test',
    component: TestPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
