import { Directive, ViewContainerRef, TemplateRef, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Directive({
  selector: '[appSsrNoRender]'
})
export class SsrNoRenderDirective implements OnInit {

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);

    }
  }

}
