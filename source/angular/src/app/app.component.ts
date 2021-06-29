import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular';

  // Backend
  backendStyles = [];
  backendScripts = [];

  // Frontend
  frontendStyles = [
    'assets/frontend/css/owl.carousel.css',
    'assets/frontend/css/bootstrap.min.css',
    'assets/frontend/css/font-awesome.css',
    'assets/frontend/css/main.css',
  ];
  frontendScripts = [
    'assets/frontend/js/jquery-2.1.4.min.js',
    'assets/frontend/js/bootstrap.min.js',
    'assets/frontend/js/owl.carousel.js',
    'assets/frontend/js/script.js',
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const CustomJsList = document.querySelectorAll('script.custom_js');
        if (CustomJsList.length > 0) {
          CustomJsList.forEach((customJs) => {
            customJs.remove();
          });
        }
        this.loadAssets();
      }
    });
  }

  loadAssets() {
    if (window.location.pathname.startsWith('/backend')) {
      this.loadStyles(this.backendStyles);
      this.loadScripts(this.backendScripts);
    } else {
      this.loadStyles(this.frontendStyles);
      this.loadScripts(this.frontendScripts);
    }
  }

  loadStyles(styles: string[]) {
    for (let i = 0; i < styles.length; i++) {
      const node = document.createElement('link');
      node.type = 'text/css';
      node.rel = 'stylesheet';
      node.href = styles[i];
      document.querySelector('head')?.appendChild(node);
    }
  }

  loadScripts(scripts: string[]) {
    for (let i = 0; i < scripts.length; i++) {
      const node = document.createElement('script');
      node.type = 'text/javascript';
      node.className = 'custom_js';
      node.async = false;
      node.src = scripts[i];
      document.querySelector('body')?.appendChild(node);
    }
  }
}
