
import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
@Directive({
  selector: '[appMouseWheel]'
})
export class MouseWheelDirective {

  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();
  
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
    }