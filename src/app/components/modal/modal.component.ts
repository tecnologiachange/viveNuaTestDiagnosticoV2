import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() content!: TemplateRef<any>;
  @ViewChild('vc', {read: ViewContainerRef}) vc!: ViewContainerRef;

  showDialog(){
    let view = this.content.createEmbeddedView(null);
    this.vc.insert(view);
    this.content.elementRef.nativeElement.previousElementSibling.classList.remove('hhidden');
    this.content.elementRef.nativeElement.previousElementSibling.classList.add('sshow');
  }

  closeDialog() {
      this.vc.clear()
  }
}
