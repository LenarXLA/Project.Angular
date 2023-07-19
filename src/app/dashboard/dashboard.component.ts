import {Component} from '@angular/core';
import {DataService} from '../data/data.service';
import {Post} from '../Post';
import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, Observable} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
    isDeleting: boolean | undefined;
    constructor(
            private dataService: DataService, 
            public dialog: MatDialog,
            private router: Router,
        ) {}

    displayedColumns = ['date_posted', 'title', 'category', 'delete', 'edit'];
    dataSource = new PostDataSource(this.dataService);

    deletePost(id: number) {
        this.isDeleting = true;
        this.dataService.deletePost(id).subscribe(() => {
            this.dataSource.connect();
            this.isDeleting = false;
        });
    }

    editPost(id: number) {
        this.router.navigateByUrl('/addPost', { state: { id: id } });
    }
}


export class PostDataSource extends DataSource<any> {
    private dataSubject = new BehaviorSubject<Post[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
  
    public loading$ = this.loadingSubject.asObservable();
    
    constructor(private dataService: DataService) {
        super();
    }

    connect(): Observable<Post[]> {
        this.loadingSubject.next(true);
    
        this.dataService.getData().subscribe(data => {
            this.dataSubject.next(data);
            this.loadingSubject.next(false);
        });

        return this.dataSubject.asObservable();
    }

    disconnect() {
    }
}
