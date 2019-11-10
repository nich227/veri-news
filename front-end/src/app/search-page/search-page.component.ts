import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.sass']
})
export class SearchPageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getData() {
    var analysis_results = this.getWebsiteURL();
    console.log(analysis_results);
  }

  getWebsiteURL() {
    var website = (<HTMLInputElement>document.getElementById("url")).value;
    // return this.http.jsonp("localhost:3000/content?url=website", 'callback');
    return this.getJSON(website);
    //console.log(this.http.jsonp("https://raw.githubusercontent.com/nich227/ncm-utd/master/src/assets/events.json", 'callback'));
  }

  getJSON(website) {
    return this.http.jsonp("https://raw.githubusercontent.com/nich227/ncm-utd/master/src/assets/events.json", 'callback');
    // return this.http.jsonp("localhost:3000/content?url=website", 'callback');
  }


  

}
