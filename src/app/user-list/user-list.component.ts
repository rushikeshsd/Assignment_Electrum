import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Router } from "@angular/router";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  usersList = [];
  isModalOpen = false;
  displayMenuOption : boolean;
  userForm: FormGroup;
  activeUser: any;

  constructor(private http: HttpClient,
    public modalCtrl: ModalController,
    private fb: FormBuilder,
    private menu: MenuController,
    private router: Router) { }

  ngOnInit() {
    this.getUserList();
    const activeUserDetails = JSON.parse(localStorage.getItem('userObj'));
    this.activeUser = activeUserDetails.email.substring(0, activeUserDetails.email.indexOf('@'));
  }

  getUserList() {
    this.http.get('https://reqres.in/api/users?page=2').subscribe(users => {
      console.log("Getting all users list", users);
      this.usersList = users['data'];
    })
  }

  delete(selectedUser) {
    this.usersList = this.usersList.filter(user => {
      return user.id !== selectedUser.id
    });
    this.http.delete('https://reqres.in/api/users/' + selectedUser.id).subscribe(users => {
      // Login after user delete
    })
  }

  initAddUserForm() {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
    });
  }

  addUser() {
    this.initAddUserForm();
    this.isModalOpen = !this.isModalOpen;
  }

  onAddUserClick() {
    console.log('userform', this.userForm);
    const reqBody = {
      first_name: this.userForm.controls.first_name.value,
      last_name: this.userForm.controls.last_name.value,
      email: this.userForm.controls.email.value
    }
    this.http.post('https://reqres.in/api/users', reqBody).subscribe(resp => {
      if (resp) {
        this.closeModal();
        alert('user Created successfully');
      }
    })
  }

  closeModal() {
    this.isModalOpen = false;
  }

  logOut() {
    this.router.navigate(['login'])
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   const loginUrl = '/login';
  //   if(this.router.url !== loginUrl){
  //     this.displayMenuOption = true;
  //   } else {
  //     this.displayMenuOption = false;
  //   }
  // }

  openSideMenu() {
    const loginUrl = '/login';
    console.log('this',this.router.url)
    if(this.router.url !== loginUrl){
    this.menu.enable(true, 'first');
    this.menu.open('first');
    }
  }
}
