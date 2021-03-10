import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-signin-callback',
  template: '<div></div>',
})
export class SigninRedirectCallbackComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) {

  }

  ngOnInit(): void {
    this._authService.completeLogin().then(user => {
      this._router.navigate(['/'], {replaceUrl: true});
    });
  }

}
