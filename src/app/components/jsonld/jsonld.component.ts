import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: '<div [innerHTML]="jsonLD"></div>'
})
export class JsonLdComponent implements  OnInit {
  jsonLD: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
    }
  // ngOnInit(changes: SimpleChanges) {
  //   const json = {
  //     "@context": "http://schema.org",
  //     "@type": "Organization",
  //     "url": "https://google.com",
  //     "name": "Google",
  //     "contactPoint": {
  //       "@type": "ContactPoint",
  //       "telephone": "+1-000-000-0000",
  //       "contactType": "Customer service"
  //     }
  //   };
  //
  //   this.jsonLD = this.getSafeHTML(json);
  // }

  getSafeHTML(value: {}) {
    // If value convert to JSON and escape / to prevent script tag in JSON
    const json = value ? JSON.stringify(value, null, 2).replace(/\//g, '\\/') : '';
    const html = `${json}`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
