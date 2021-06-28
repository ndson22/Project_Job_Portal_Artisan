import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular';
  // isLoading: boolean = true;
  completeLoading!: Promise<boolean>;

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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
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

  async loadAssets() {
    if (window.location.pathname.startsWith('/backend')) {
      await this.loadStyles(this.backendStyles);
      await this.loadScripts(this.backendScripts);
    } else {
      await this.loadStyles(this.frontendStyles);
      await this.loadScripts(this.frontendScripts);
    }
    this.completeLoading = Promise.resolve(true);
  }

  loadStyles(styles: string[]): Promise<boolean> {
    for (let i = 0; i < styles.length; i++) {
      const node = document.createElement('link');
      node.type = 'text/css';
      node.rel = 'stylesheet';
      node.href = styles[i];
      document.querySelector('head')?.appendChild(node);
    }

    return Promise.resolve(true);
  }

  loadScripts(scripts: string[]): Promise<boolean> {
    for (let i = 0; i < scripts.length; i++) {
      const node = document.createElement('script');
      node.type = 'text/javascript';
      node.className = 'custom_js';
      node.async = false;
      node.src = scripts[i];
      document.querySelector('body')?.appendChild(node);
    }

    return Promise.resolve(true);
  }
}
