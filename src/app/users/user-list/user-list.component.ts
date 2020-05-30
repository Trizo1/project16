import { Component, OnInit } from '@angular/core';
import { User, UserSection } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userSection = UserSection;
  userSectionCount = Object.keys(this.userSection);
  searchStr = '';
  reversedId = false;
  reversedAge = false;
  sortBy: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userSectionCount = this.userSectionCount.slice(0, this.userSectionCount.length / 2);
    for (let index of this.userSectionCount) {
      this.userSectionCount[index] = Number(this.userSectionCount[index]);
    }
    this.getData();
  }

  getByType(section: number) {
    return this.users.filter(user => user.section === section);
  }

  async getData() {
    try {
      let users = this.userService.getAll();
      this.users = isNullOrUndefined(await users) ? [] : await users;
    }
    catch (err) {
      console.log(err);
    }
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  onEditProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  async onDelete(id: number) {
    try {
      await this.userService.deleteOneById(id);
    } catch (err) {
      console.log(err);
    }
    this.getData();
  }

  getAge(user: User): number {
    let dateDay = user.date.substring(0, 2);
    let dateMonth = user.date.substring(3, 5);
    let dateYear = user.date.substring(user.date.length - 4);

    let cur = new Date();
    let today = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate());
    let birthDate = new Date(+dateYear, +dateMonth, +dateDay);
    let birthDateThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    let age;
    age = today.getFullYear() - birthDate.getFullYear();
    if (today < birthDateThisYear) {
      age = age - 1;
    }
    user.age = age;
    return age;
  }


}
