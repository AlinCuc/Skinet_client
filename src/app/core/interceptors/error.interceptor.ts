import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackbar = inject(SnackbarService);

  function getErrorMessage(err: HttpErrorResponse): string {
    if (err?.error?.title) return err.error.title;
    if (typeof err.error === 'string') return err.error;
    return 'A apărut o eroare neașteptată';
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      switch (err.status) {
        case 400:
          if (err.error?.errors) {
            const modelStateErrors: any[] = [];
            for (const key in err.error.errors) {
              if (err.error.errors[key]) {
                modelStateErrors.push(err.error.errors[key]);
              }
            }
            return throwError(() => modelStateErrors.flat());
          } else {
            snackbar.error(getErrorMessage(err));
          }
          break;

        case 401:
          snackbar.error(getErrorMessage(err));
          break;

        case 404:
          router.navigateByUrl('/not-found');
          break;

        case 500:
          const navigationExtras: NavigationExtras = {
            state: { error: err.error },
          };
          router.navigateByUrl('/server-error', navigationExtras);
          break;

        default:
          snackbar.error('Eroare necunoscută');
          break;
      }

      return throwError(() => err);
    })
  );
};
