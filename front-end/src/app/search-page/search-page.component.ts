import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.sass']
})
export class SearchPageComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  /*Function getWebsiteURL() will be called when the getData function calls it
   *it gets the information in the textbox which will be a url link, this link
   *will be passed to the getJSON function and will get the JSON payload from the api call
   */
  getWebsiteURL() {
    var website = (<HTMLInputElement>document.getElementById("url")).value;
    this.get_json(website);
  }

  /*Function get_json takes in a one parameter website which is the url that the api will call.
   *This function will mess with the json data
   */ 
  get_json(website) {
    $.getJSON("https://obscure-reef-11935.herokuapp.com/", function (json) {
    // return this.http.jsonp("localhost:3000/content?url=website", 'callback');
      console.log(JSON.stringify(json));
      //bias-score
      //top-bias-phrases (is json form)
    });
    this.router.navigate(['/','result']);
  }
  
}