import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { Subject } from 'rxjs';

export interface IUser {
  id?: number;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: IUser = {
    username: null,
    password: null
  };

  constructor(private router: Router, private toastService: ToastService) {
  }

  ngOnInit() {

  }

  login(user: IUser) {
    

    const presetUser ={ username: 'evan', password: 'evan123'}
    if (user.username !=null && user.password != null && user.username !== '' && user.password !== '') {
      // log the user in
     
  
      if (user.username === presetUser.username && user.password === presetUser.password) {
        // actually log them in
        // saving data to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        // navigate to contacts page
        this.router.navigate(['contacts', user]);

      }else {
        this.toastService.showToast('warning', 2000,'Username or password is incorrect!')
      }
    

    } else {
      this.toastService.showToast('danger', 2000,'Must specify credentials')
    }
  }

  
  

}
