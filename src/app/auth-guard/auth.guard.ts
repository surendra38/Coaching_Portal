import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = localStorage.getItem('auth');
  if (isAuthenticated) {
    console.log("isAuthenticated working");
    return true; // Allow access to the route
  } else {
    console.log("isAuthenticated not working");
    return false; // Deny access to the route
  }
};
