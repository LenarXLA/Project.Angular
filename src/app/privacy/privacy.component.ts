import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})

export class PrivacyComponent implements OnInit {

  public claims: any[] = [];

  constructor(private _repository: DataService) { }

  ngOnInit(): void {
    this.getClaims();
  }

  public getClaims = () =>{
    this._repository.getClaims()
    .subscribe(res => {
      this.claims = res as [];
    })
  }
}
