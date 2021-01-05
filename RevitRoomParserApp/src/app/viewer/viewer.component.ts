import { collectExternalReferences } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {

  levels: ILevel[];
  selectedLevel: ILevel;
  selection: string[];
  selectedRoom: Room;
  rooms: Room[] = [];

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

  onLoadSVG(svg: SVGElement, parent: Element): SVGElement {

    console.log(svg);
    console.log(this.rooms);

    const rooms = svg.querySelectorAll("g");

    rooms.forEach((room, index) => {
      console.log(`path:${index} , roomId=${room.getAttribute('roomid')}`);

      const r = new Room(room)

      const paths = room.querySelectorAll("path");
      paths.forEach((path, index) => {
        path.removeAttribute('style');
      });
      // room.setAttribute('style', 'fill:red;fill-opacity:1;stroke:black;');
    });
    return svg;
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

  constructor(svg: SVGGElement) {
    this.name = svg.getAttribute('roomname');
    this.id = svg.getAttribute('roomid');
    this.svg = svg;
    this.svg.onclick = this.onRoomClick;
  }

  onRoomClick = (e:any) => {
    console.log(this.name + '-' + this.id);
  }
}