import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../item';
import { FeedService } from '../feed.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  items$: Observable<Item[]>;
  constructor(private feedService: FeedService,
    private router: Router) { }
  ngOnInit(): void {
    this.items$ = this.feedService.getFeed(0);
  }

  goToItem(item) {
    this.router.navigateByUrl(`/item/${item._id}`);
  }

}
