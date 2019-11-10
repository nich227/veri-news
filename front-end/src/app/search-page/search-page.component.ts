import { Component, OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { EventEmitter } from "events";
import { StateService } from "../state.service";

declare var particlesJS: any;

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.sass"]
})
export class SearchPageComponent implements OnInit {
  input_json: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private state: StateService
  ) {}

  ngOnInit() {
    particlesJS.load(
      "particles-js",
      "assets/data/particlesjs-config.json",
      function() {
        console.log("callback - particles.js config loaded");
      }
    );
    this.state.json.subscribe(input_json => (this.input_json = input_json));
  }

  /*Function getWebsiteURL() will be called when the getData function calls it
   *it gets the information in the textbox which will be a url link, this link
   *will be passed to the getJSON function and will get the JSON payload from the api call
   */
  getWebsiteURL() {
    var website = (<HTMLInputElement>document.getElementById("url")).value;
    if (website === "") window.alert("You must enter a website.");
    else this.get_json(website);
  }

  /*Function get_json takes in a one parameter website which is the url that the api will call.
   *This function will mess with the json data
   */
  // @Output() public score = new EventEmitter();
  // @Output() public phrases = new EventEmitter();
  async get_json(website) {
    var url = "https://obscure-reef-11935.herokuapp.com";
    var url1 = url + "/contents?url=" + website;
    var tmp;

    $.ajaxSetup({
      async: false
    });

    $.getJSON(url1, function(json) {
      console.log(json);
      if (json == "200") {
        $.getJSON(url, function(json) {
          tmp = json;
        });
      }
    });
    this.state.changeJSON(JSON.stringify(tmp));
    this.router.navigate(["/", "result"]);
  }
}
