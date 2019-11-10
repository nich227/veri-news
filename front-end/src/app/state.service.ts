import { Injectable }from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class StateService {
  private bias_json = new BehaviorSubject<string>('');
  json = this.bias_json.asObservable()
  
  constructor() { }
  
  changeJSON(json: string) {
    this.bias_json.next(json);
  }
}