import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onLoadSVG(svg: SVGElement, parent: Element) {
    console.log(svg);
    const component = this;
    const rooms = svg.querySelectorAll("g");
    rooms.forEach((room, index) => {
      const roomId = room.getAttribute('roomid');
      console.log(`path:${index} , roomId=${room.getAttribute('roomid')}`);
      room.onclick = (e:any) => {console.log(roomId);}
      // room.addEventListener('click', this.onClick.bind(this));
      const paths = room.querySelectorAll("path");
      paths.forEach((path, index) => {
        path.removeAttribute('style');
      });
      // room.setAttribute('style', 'fill:red;fill-opacity:1;stroke:black;');
    });
    return svg;
  }

  onClick(e: any, roomId: string) {
    console.log(roomId);
  }
}
