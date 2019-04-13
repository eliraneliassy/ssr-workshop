import { Directive, ViewContainerRef, TemplateRef, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Directive({
  selector: '[appSsrRender]'
})
export class SsrRenderDirective implements OnInit {


  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
