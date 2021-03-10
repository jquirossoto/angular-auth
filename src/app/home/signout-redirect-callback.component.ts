import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-signout-callback',
  template: '<div></div>',
})
export class SignoutRedirectCallbackComponent implements OnInit {

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this._authService.completeLogout().then(_ => {
      this.router.navigate(['/'], {replaceUrl: true});
    });
  }

}
