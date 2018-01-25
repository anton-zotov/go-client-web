import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cabinet-layout',
  templateUrl: './cabinet-layout.component.html',
  styleUrls: ['./cabinet-layout.component.css']
})
export class CabinetLayoutComponent implements OnInit {

  constructor( private server: ServerService,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit() { }

  logout() {
    this.server.logout();
    this.router.navigate(['']);
  }

  getUrl() {
    return this.route.snapshot.firstChild.url[0].path;
  }
}
