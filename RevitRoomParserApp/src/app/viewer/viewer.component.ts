import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit, AfterViewInit {
  constructor() {}

  @ViewChild("svgPlan") svgPlan;
  
  ngOnInit(): void {

  }

  ngAfterViewInit() {

    const objElm = this.svgPlan.nativeElement as HTMLObjectElement;

    objElm.onload = () => {
      const rooms = objElm.contentDocument.querySelectorAll("g");

      rooms.forEach((room, index) => {
        console.log(`path:${index} , roomId=${room.getAttribute("roomId")}`);
        room.addEventListener('click', this.onClick.bind(this));
        room.setAttribute("style", "fill:red;fill-opacity:1");
      });
    };
  }

  onClick(e: any) {
    console.log(e);
  }
}
