import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.sass']
})
export class ResultsPageComponent implements OnInit {
  bias: string;
  constructor(private state: StateService) { }
  
  ngOnInit() {
    this.state.json.subscribe(bias => this.bias = bias)
  }

  // @Input() public resultGridList : Array <any> = [];


  press() {
    this.state.json.subscribe(result => {
      this.bias = result; // this set's the username to the default observable value
      console.log(this.bias);
    });
  }
}
