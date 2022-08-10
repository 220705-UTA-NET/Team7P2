import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor() { }

  @Input() openProfileModalCommand: boolean = false;
  ngOnChanges() {
    this.toggleProfileModal();
  } 

  userProfile = this.setUserProfile();
  setUserProfile() {
    return "testUser";
  }

  profileModalToggle = true;
  toggleProfileModal() {
    console.log("toggle profile modal")
    this.profileModalToggle = !this.profileModalToggle;
  }

  // fetch order history from API
  viewOrderHistory() {}

  // move user back to login page & reset the session user
  logout() {}

}
