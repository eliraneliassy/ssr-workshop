import { FeedService } from './feed.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, tap, first } from 'rxjs/operators';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Item } from './item';
import { Observable, of } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ProductResolve implements Resolve<Item> {
    constructor(private feedService: FeedService,
        @Inject(PLATFORM_ID) private platformId,
        private transferState: TransferState) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item> {

        const productId = route.params['id'];

        const PRODUCT_KEY = makeStateKey<Item>('item-' + productId);

        if (this.transferState.hasKey(PRODUCT_KEY)) {

            const product = this.transferState.get<Item>(PRODUCT_KEY, null);

            this.transferState.remove(PRODUCT_KEY);

            return of(product);
        } else {
            return this.feedService.getFeed()
                .pipe(
                    map((items: Item[]) => items.find(x => x._id === productId)
                    ))
                .pipe(
                    first(),
                    tap(product => {

                        if (isPlatformServer(this.platformId)) {
                            this.transferState.set(PRODUCT_KEY, product);
                        }

                    })
                );

        }


    }


}
