import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { StateService } from '../state.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.sass']
})
export class ResultsPageComponent implements OnInit {
  bias: string;
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width: 1,
    height: 300,
    overflow: false,
  };
 
  data: CloudData[] = [
    
  ];

  constructor(private state: StateService) { }
  
  ngOnInit() {
    this.state.json.subscribe(bias => this.bias = bias);
    //console.log(this.bias);
    let jsonObj = JSON.parse(this.bias);
    let final_score = JSON.parse(this.bias).bias_score * 10;
    $(document).ready(function() {
      $('#lin-gauge').attr('value', final_score);
      jsonObj.top_bias_phrases.forEach(obj > {
        this.data.push({text: obj.text, weight: obj.sentiment, color: '#ffffff'});
      });
    });
  }
}
