import {Component, OnInit, OnDestroy} from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { UsersService } from 'src/app/modules/shared/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  constructor(
    private user: UsersService,
    private router: Router
  ) {}
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name'];
  dataSource = new MatTableDataSource();
  loading = false;
  subs = new Subscriber();
  pageData: any;

  ngOnInit() {
    this.loadUserData(1);
  }

  loadUserData(id) {
    this.loading = true;
    this.subs.add(
      this.user.getUsersList(id).subscribe(
        (res: any) => {
          this.loading = false;
          this.pageData = res.data;
          this.dataSource = res.data;
        }
      )
    );
  }

  goToUserDetailsPage(userId) {
    if(userId) {
      this.router.navigate(['details', userId]);
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}

