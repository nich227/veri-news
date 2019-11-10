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
    this.state.json.subscribe(bias => this.bias = bias);
    let final_score = JSON.parse(this.bias).bias_score * 10;
    $(document).ready(function() {
      $('#lin-gauge').attr('value', final_score);
    });
  }
}
