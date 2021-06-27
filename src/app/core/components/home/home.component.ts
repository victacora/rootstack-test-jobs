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
  center = {lat: 6.267205910588489, lng: -75.46763520402435};
  zoom = 4;
  display?: google.maps.LatLngLiteral;
  dataSourceSize:number = 0;
  dataSourcePageSize:number = 15;

  @ViewChild(MatPaginator) paginator: any;

  constructor(private authService: AuthService, private jobsService: JobsServiceService,
    private router: Router) { }

  ngAfterViewInit(): void {
    
    this.jobsService.getJobs(this.paginator.pageIndex).subscribe(response => {
      this.dataSourceSize = response.total;
      this.dataSourcePageSize = response.per_page;
      this.dataSource = new MatTableDataSource<any>(response.data)
      this.dataSource.paginator = this.paginator;
    });

    this.paginator.page.subscribe(()=>
    {
      this.jobsService.getJobs(this.paginator.pageIndex+1).subscribe(response => {
        this.dataSource = new MatTableDataSource<any>(response.data);
      });
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

  public getRecord(row:any){

  }
}
