import {inject, Injectable} from '@angular/core';
import {IUser} from '../../apps/admin/src/app/interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable, takeLast} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  http: HttpClient = inject(HttpClient);

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
}
