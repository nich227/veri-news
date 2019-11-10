import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.sass']
})
export class ResultsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() public resultGridList : Array <any> = [];

}
