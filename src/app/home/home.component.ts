import { Component, OnInit, Optional } from '@angular/core';
import {trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';
import {DataService} from '../data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('goals',[
      transition('*=>*',[
        query(':enter',style({opacity:0}),{optional:true}),
        query(':enter',stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity:0,transform:'translateU(-75%)',offset:0}),
            style({opacity:.5,transform:'translateU(35px)',offset:.3}),
            style({opacity:1,transform:'translateU(0)',offset:.1}),
          ]))]),{optional:true}),
          query(':leave',stagger('300ms',[
            animate('.6s ease-in',keyframes([
              style({opacity:1,transform:'translateU(0)',offset:0}),
              style({opacity:.5,transform:'translateU(35px)',offset:.3}),
              style({opacity:0,transform:'translateU(-75%)',offset:.1}),
            ]))]),{optional:true})

      ])
    ])
  ]
 })
export class HomeComponent implements OnInit {

  itemCount:number;
  btnText:string = 'Add an Item';
  goalText:string='My First Life Goal';
  goals=[];
  constructor(private _data:DataService) { }

  ngOnInit() {
    
    this._data.goal.subscribe(res=> this.goals = res);
    this.itemCount = this.goals.length;
    this._data.chageGoal(this.goals);
  }
  addItem(){
    this.goals.push(this.goalText);
    this.goalText='';
    this.itemCount = this.goals.length;
    this._data.chageGoal(this.goals);
  }
  removeItem(i){
    this.goals.splice(i,1);
    this._data.chageGoal(this.goals);
  }

}