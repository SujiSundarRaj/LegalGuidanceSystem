import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  private readonly registeredUserSource = new BehaviorSubject<User[]>([]);
  users$ = this.registeredUserSource.asObservable();

  private readonly currentUser = new BehaviorSubject<User | undefined>(
    undefined
  );
  currentUser$ = this.currentUser.asObservable();

  constructor() {}

  addUser(user: User) {
    const existingUsers = this.registeredUserSource.value;
    existingUsers.push(user);
    this.registeredUserSource.next(existingUsers);
  }

  getUser(emailId: string, password: string) {
    return this.registeredUserSource.value.find(
      (user) => user.emailId === emailId && user.password === password
    );
  }

  updateUser(user: User) {
    if (this.getUser(user.emailId, user.password)) {
      const users = this.registeredUserSource.value.map((val) => {
        if (val.emailId === user.emailId) {
          return user;
        }
        return val;
      });
      this.registeredUserSource.next(users);
      this.setCurrentUser(user);
    }
  }

  setCurrentUser(user: User | undefined) {
    this.currentUser.next(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    const loggedIn = user ? true : false;
    sessionStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }
}
