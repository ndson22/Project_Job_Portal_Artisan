import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  title!: string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.url.subscribe(() => {
      this.title =
        this.route.snapshot.firstChild?.data?.title ??
        this.route.snapshot.data?.title;
    });
    this.title =
      this.route.snapshot.firstChild?.data?.title ??
      this.route.snapshot.data?.title;
  }

  ngOnInit(): void {}
}
