import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { UserService } from 'src/app/shared/services/user.service';
import { User, UserSection } from 'src/app/shared/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id: number;
  user: User;
  userSection = UserSection;
  userForm: FormGroup;
  phoneMask = ['8', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  dateMask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

  constructor(private activateRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    this.activateRoute.params.subscribe((params) => {
      if (!isNullOrUndefined(params.id)) {
        this.id = +params.id;
      } else {
        this.id = null;
      }

    });
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      patronymic: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      date: new FormControl(null, [Validators.required]),
      section: new FormControl(null, [Validators.required]),
    });
    this.getData();
  }

  async getData() {
    if (!isNullOrUndefined(this.id)) {
      try {
        let user = this.userService.getOneById(this.id);
        this.user = await user;
      } catch (err) {
        console.log(err);
      }
      this.userForm.patchValue({
        name: this.user.name,
        surname: this.user.surname,
        patronymic: this.user.patronymic,
        phone: this.user.phone,
        email: this.user.email,
        date: this.user.date,
        section: this.user.section,
      });
    }
  }

  async onDelete() {
    try {
      await this.userService.deleteOneById(this.id);
    } catch (err) {
      console.log(err);
    }
    this.router.navigate(['/users']);
  }

  async onSave() {
    let data = this.userForm.value;
    data.phone = data.phone.replace(/\D/g, '');
    if (!isNullOrUndefined(this.id)) {
      try {
        await this.userService.putOne(this.id, data);
        this.router.navigate(['/users']);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let res = await this.userService.postOne(data);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.log(err);
      }
    }
  }

}
