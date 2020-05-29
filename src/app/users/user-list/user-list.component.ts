import { Component, OnInit } from '@angular/core';
import { User, UserSection } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userSection = UserSection;
  userSectionCount = Object.keys(this.userSection);

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSectionCount = this.userSectionCount.slice(0, this.userSectionCount.length / 2);
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
    } finally {
      console.log(this.users);
    }
  }

}
