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

  /*Function getData() will be called when the user hit the Bias Check button, 
   *it will call the getWebsiteURL function which will return the JSON payload 
   */
  getData() {
    var analysis_results = this.getWebsiteURL();
    console.log(analysis_results);
  }

  /*Function getWebsiteURL() will be called when the getData function calls it
   *it gets the information in the textbox which will be a url link, this link
   *will be passed to the getJSON function and will get the JSON payload from the api call
   */
  getWebsiteURL() {
    var website = (<HTMLInputElement>document.getElementById("url")).value;
    return this.getJSON(website);
  }

  /*Function getJSON takes in a one parameter website which is the url that the api will call.
   *This function returns the JSON payload that is the result of the call.
   */
  getJSON(website) {
    return this.http.jsonp("https://raw.githubusercontent.com/nich227/ncm-utd/master/src/assets/events.json", 'callback');
    // return this.http.jsonp("localhost:3000/content?url=website", 'callback');
  }


  

}
