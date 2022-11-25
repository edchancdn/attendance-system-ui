import { Component, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})

@Injectable()
export class MessageModalComponent implements OnInit {

  @ViewChild('messageModal') 
  private modalContent!: TemplateRef<MessageModalComponent>
  @Output() newConfirmationEvent = new EventEmitter<string>();
  @Input() modalStyle: any;
  @Input() modalTitle: any;
  @Input() modalBody: any;
  @Input() modalButtonColor: any;

  private modalRef!: NgbModalRef;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  open(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { size: 'md' })
      this.modalRef.result.then((result) => {
        console.log(result);
        this.newConfirmationEvent.emit(result);
      }, (reason) => {
        console.log(reason);
      });
    })
  }

  close() {
    this.modalRef.close()
  }

  dismiss() {
    this.modalRef.dismiss()
  }

}
