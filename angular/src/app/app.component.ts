import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent
  implements OnInit, AfterViewInit, AfterContentInit, DoCheck
{
  title = 'angular';
  isLoading!: boolean;

  // Backend
  backendStyles = [
    'assets/backend/plugins/vectormap/jquery-jvectormap-2.0.2.css',
    'assets/backend/plugins/simplebar/css/simplebar.css',
    'assets/backend/plugins/select2/css/select2.min.css',
    'assets/backend/plugins/select2/css/select2-bootstrap4.css',
    'assets/backend/plugins/perfect-scrollbar/css/perfect-scrollbar.css',
    'assets/backend/plugins/metismenu/css/metisMenu.min.css',
    'assets/backend/css/pace.min.css',
    'assets/backend/css/bootstrap.min.css',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap',
    'assets/backend/css/app.css',
    'assets/backend/css/icons.css',
    'assets/backend/css/header-colors.css',
  ];
  backendScripts = [
    'assets/backend/js/pace.min.js',
    'assets/backend/js/bootstrap.bundle.min.js',
    'assets/backend/js/jquery.min.js',
    'assets/backend/plugins/simplebar/js/simplebar.min.js',
    'assets/backend/plugins/metismenu/js/metisMenu.min.js',
    'assets/backend/plugins/perfect-scrollbar/js/perfect-scrollbar.js',
    'assets/backend/js/app.js',
  ];

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

  constructor(private router: Router, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.spinner.show();

    this.router.events.subscribe((event) => {
      // this.isLoading = true;
      // this.spinner.show();
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

  ngDoCheck(): void {}

  ngAfterContentInit(): void {}

  ngAfterViewInit(): void {}

  async loadAssets() {
    if (window.location.pathname.startsWith('/backend')) {
      await this.loadStyles(this.backendStyles);
      await this.loadScripts(this.backendScripts);
    } else {
      await this.loadStyles(this.frontendStyles);
      await this.loadScripts(this.frontendScripts);
    }
    setTimeout(() => {
      this.isLoading = false;
      this.spinner.hide();
    }, 500);
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
      node.defer = true;
      node.src = scripts[i];
      document.querySelector('body')?.appendChild(node);
    }

    return Promise.resolve(true);
  }
}
