import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class FirebaseAuthService  {
  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  /////////////////////////////////////////////////////////////////////////////
  // GET PROPERTIES

  // Returns true if user is logged in
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
  get authenticated(): boolean {
    // debugger
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    // debugger
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    // debugger
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    // debugger
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    // debugger
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  // get currentUserDisplayName(): string {
  //   if (!this.authState) { return 'Guest' }
  //   else if (this.currentUserAnonymous) { return 'Anonymous' }
  //   else { return this.authState['displayName'] || 'User without a Name' }
  // }

  get displayName(): string {
    // debugger
    //   if (!this.authState) { return 'Guest' }
    //   else if (this.currentUserAnonymous) { return 'Anonymous' }
    //   else { return this.authState['displayName'] || 'User without a Name' }

    if (!this.authState)
      return 'Not Signed In'
    else
      return this.authState['displayName'] || 'Unknown';
  }
  set displayName(name: string) {
    // debugger
    this.afAuth.auth.currentUser.updateProfile({
      displayName: "Jim",
      photoURL: ''
    }).then(resolve => { console.log("success") }, reject => { });
    // this.updateUserData();
  }

  //// Social Auth ////
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider()
    return this.socialSignIn(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    console.log("user logged in with facebook:" + this.displayName);
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.authState = credential.user
        // this.updateUserData()
      })
      .catch(error => console.log(error));
  }


  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth.signInAnonymously()
      .then((user) => {
        this.authState = user
        // this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  //// Email/Password Auth ////
  emailSignup(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user
        // this.updateUserData()
        return user;
      })
      .catch(error => console.log(error));
  }

  emailSignin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        // this.updateUserData()
        console.log("user logged in with email:" + email);        
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////
  signOut() {
    console.log('logged out');
    this.authState = null;
    this.afAuth.auth.signOut();
    // this.router.navigate(['/'])
  }


  // //// Helpers ////
  // private updateUserData(): void {
  //   //debugger
  //   console.log('update data')
  //   // Writes user name and email to realtime db
  //   // useful if your app displays information about houses or for admin features
  //   let path = `houses/${this.currentUserId}`; // Endpoint on firebase
  //   let data = {
  //     email: this.authState.email,
  //     name: this.authState.displayName
  //   }

  //   this.db.object(path).update(data)
  //     .catch(error => console.log(error));
  // }
  

  // login(email: string, password: string) {
  //   debugger
  //   //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
  //   if (this.authenticated === true)
  //     throw 'Already authenticated';

  //   return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then(user => {
  //       this.authState = user;
  //       //this.updateUserData();
  //     })
  //     .catch(error => console.log(error));
  // }
}
