import { collectExternalReferences } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
  levels: ILevel[];
  selectedLevel: ILevel;
  selection: string[];
  selectedRooms: Room[] = [];
  rooms: Room[] = [];
  private svgPlan: SVGElement;

  @ViewChild('container') container : ElementRef;
  
  constructor() {
    console.log(this.rooms);
  }

  ngOnInit(): void {
    this.levels = [
      { name: 'Level 1', svg: '/assets/rooms311.svg' },
      { name: 'Level 2', svg: '/assets/rooms694.svg' },
      { name: 'Level 3', svg: '/assets/rooms136342.svg' },
    ];

    this.selectedLevel = this.levels[0];
  }

  handleSVG(svg: SVGElement) {

    svg.setAttribute('width', '1');
    svg.setAttribute('height', '1');

    const paths = svg.querySelectorAll('path');
    paths.forEach((path, index) => {
      path.removeAttribute('style');
      path.setAttribute('class','room')
      // path.removeAttribute('stroke-width');
      // console.log(path);
      // '[ngStyle]','myStyles'
    });

    return svg;
  }

  onMouseWheelUp() {
    let x = Number(this.svgPlan.getAttribute('viewBox').split(', ')[2]);
    let y = Number(this.svgPlan.getAttribute('viewBox').split(', ')[3]);

    this.svgPlan.setAttribute('viewBox','-41.87434, -110.0051, '+ x*1.1 +', '+ y*1.1+'');
    console.log('test');
    //this.svgPlan.setAttribute('width','100');
  }

  onMouseWheelDown() {

    let x = Number(this.svgPlan.getAttribute('viewBox').split(', ')[2]);
    let y = Number(this.svgPlan.getAttribute('viewBox').split(', ')[3]);

    this.svgPlan.setAttribute('viewBox','-41.87434, -110.0051, '+ x*0.9 +', '+ y*0.9+'');
    console.log('test2');
    // this.svgPlan.setAttribute('width','100');
  }

  onClickWheelMove(event: any) {
    

    let refX:number = (this.container.nativeElement as HTMLElement).offsetLeft;
    let refY:number = (this.container.nativeElement as HTMLElement).offsetTop;

    let deltaX = event.x;
    let deltaY = event.y;

    let x = Number(this.svgPlan.getAttribute('viewBox').split(', ')[0]);
    let y = Number(this.svgPlan.getAttribute('viewBox').split(', ')[1]);

    let width = Number(this.svgPlan.getAttribute('viewBox').split(', ')[2]);
    let heigh = Number(this.svgPlan.getAttribute('viewBox').split(', ')[3]);

    let viewbox: string = ((x - deltaX)*0.1).toString() +', '+ ((y - deltaY)*0.1).toString() +', '+ width +', '+ heigh
    this.svgPlan.setAttribute('viewBox',viewbox);

    console.log(event);
  }

  onSVGInserted(svg: SVGElement) {
    this.svgPlan = svg;
    let width:number = (this.container.nativeElement as HTMLElement).offsetWidth;
    let height:number = (this.container.nativeElement as HTMLElement).offsetHeight;

    let size = width;

    this.svgPlan.setAttribute('width',width.toString());
    this.svgPlan.setAttribute('height',(height-100).toString());
    

    const rooms = svg.querySelectorAll('g');

    rooms.forEach((room, index) => {
      console.log(`path:${index} , roomId=${room.getAttribute('roomid')}`);

      const r = new Room(room, this.selectedRooms);
      this.rooms.push(r);

      // const paths = room.querySelectorAll("path");
      // paths.forEach((path, index) => {
      //   path.removeAttribute('style');
      // });
      // room.setAttribute('style', 'fill:red;fill-opacity:1;stroke:black;');
    });
  }
}

interface ILevel {
  name: string;
  svg: string;
}

class Room {
  name: string;
  id: string;
  svg: SVGGElement;
  selectedRooms: Room[];

  constructor(svg: SVGGElement, selectedRooms: Room[]) {
    this.name = svg.getAttribute('roomname');
    this.id = svg.getAttribute('roomid');
    this.svg = svg;
    this.svg.onclick = this.onRoomClick;
    this.selectedRooms = selectedRooms;
  }

  onRoomClick = (e: any) => {
    console.log(this.name + '-' + this.id);

    if (this.selectedRooms.indexOf(this) > -1) {
      // Remove from the list
      const index = this.selectedRooms.indexOf(this, 0);
      if (index > -1) {
        this.selectedRooms.splice(index, 1);
      }

      const paths = this.svg.querySelectorAll('path');
      paths.forEach((path, index) => {
        path.setAttribute('class','room')
      });
    } else {
      // Add to the list
      this.selectedRooms.push(this);

      const paths = this.svg.querySelectorAll('path');
      paths.forEach((path, index) => {
        path.setAttribute('class','selectedRoom')
      });
    }
  };
}
