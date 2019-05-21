import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/modules/shared/services/users.service';
import { Subscriber } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  userId: any;
  loading: boolean = false;
  userDetails: any;
  subs = new Subscriber();
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private location: Location
  ) {}

  ngOnInit() {
    this.userId = this.activatedRoute.snapshot.params.userId;
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.loading = true;
    this.subs.add(
      this.userService.getUserData(this.userId).subscribe(
        (res: any) => {
          if (res) {
            this.userDetails = res.data;
            this.loading = false;
          }
        }
      )
    );
  }

  goToBackPage() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
