import { JobsServiceService } from './../../services/jobs-service.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  user: any;
  isAuthenticated: boolean = false;
  displayedColumns: string[] = ['id','title', 'description', 'status', 'latitude', 'longitude'];
  dataSource: any;
  center = {lat: 24, lng: 12};
  zoom = 15;
  display?: google.maps.LatLngLiteral;
  
  @ViewChild(MatPaginator) paginator: any;

  constructor(private authService: AuthService, private jobsService: JobsServiceService,
    private router: Router) { }

  ngAfterViewInit(): void {
    this.jobsService.getJobs(1).subscribe(response => {
      this.dataSource = new MatTableDataSource<any>(response.data)
      this.dataSource.paginator = this.paginator;
    });
  }

  public ngOnInit() {
    this.authService.userData().subscribe(user => {
      this.user = user ? user : {
        name: '-',
        email: '-',
      };
      this.isAuthenticated = !!user;
    });
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
