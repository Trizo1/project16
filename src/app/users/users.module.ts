import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { TextMaskModule } from 'angular2-text-mask';
import { SortByPipe } from './pipes/sort-by.pipe';


@NgModule({
  declarations: [UsersComponent, UserListComponent, UserEditComponent, SearchFilterPipe, SortByPipe],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
  ],
})
export class UsersModule { }
