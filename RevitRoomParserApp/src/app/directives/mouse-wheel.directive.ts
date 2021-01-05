
import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
@Directive({
  selector: '[appMouseWheel]'
})
export class MouseWheelDirective {

  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();
  @Output() wheelClickMove = new EventEmitter();
  
  i: number = 1;
  constructor(

    private el: ElementRef
  ) { }

      @HostListener('mousewheel', ['$event']) onMousewheel(event) {
        if (event.wheelDelta > 0) {
          this.mouseWheelUp.emit(event);
        }
        if (event.wheelDelta < 0) {
          this.mouseWheelDown.emit(event);
        }
      }

      private isDown: boolean;
      private offset: number[];

      @HostListener('mousedown', ['$event']) onWheelDown(event: MouseEvent) {

        if (event.button == 1)
        {
          this.isDown = true;
          this.offset = [
            event.clientX,
            event.clientY
        ];
    
        }
      }

      @HostListener('mouseup', ['$event']) onWheelUp(event: MouseEvent) {

        if (event.button == 1)
        {
          this.isDown = false;
        }
      }

      @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {

        if (this.isDown)
        {
          event.preventDefault();
          let mouveDelta = {
            x : event.clientX - this.offset[0],
            y : event.clientY - this.offset[1]
          }
          this.wheelClickMove.emit(mouveDelta);
        }
      }
    }
