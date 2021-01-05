import { collectExternalReferences } from '@angular/compiler';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
  levels: ILevel[];
  selectedLevel: ILevel;
  selection: string[];
  selectedRoom: Room[] = [];
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

  handleSVG(svg: SVGElement) {
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

  onSVGInserted(svg: SVGElement) {
    console.log(svg);
    const rooms = svg.querySelectorAll('g');

    rooms.forEach((room, index) => {
      console.log(`path:${index} , roomId=${room.getAttribute('roomid')}`);

      const r = new Room(room, this.selectedRoom);
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
  selectedRoom: Room[];

  constructor(svg: SVGGElement, selectedRoom: Room[]) {
    this.name = svg.getAttribute('roomname');
    this.id = svg.getAttribute('roomid');
    this.svg = svg;
    this.svg.onclick = this.onRoomClick;
    this.selectedRoom = selectedRoom;
  }

  onRoomClick = (e: any) => {
    console.log(this.name + '-' + this.id);

    if (this.selectedRoom.indexOf(this) > -1) {
      // Remove from the list
      const index = this.selectedRoom.indexOf(this, 0);
      if (index > -1) {
        this.selectedRoom.splice(index, 1);
      }

      const paths = this.svg.querySelectorAll('path');
      paths.forEach((path, index) => {
        path.setAttribute('class','room')
      });
    } else {
      // Add to the list
      this.selectedRoom.push(this);

      const paths = this.svg.querySelectorAll('path');
      paths.forEach((path, index) => {
        path.setAttribute('class','selectedRoom')
      });
    }
  };
}
