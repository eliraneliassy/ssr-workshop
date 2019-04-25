import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private httpClient: HttpClient) { }

  getFeed(page: number = 0): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`https://api.fashbash.co/api/feed?page=${page}`);
  }

}
