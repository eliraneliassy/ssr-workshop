import { FeedService } from './feed.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductResolve implements Resolve<Item> {
    constructor(private feedService: FeedService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<Item> {
        const productId = route.params['id'];
        return this.feedService.getFeed().pipe(
            map(x => x.find(item => item._id === productId))
        );
    }

}
