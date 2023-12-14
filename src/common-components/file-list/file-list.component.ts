import { Component, OnInit } from '@angular/core';
import { AddFileModalComponent } from '../add-file-modal/add-file-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AudioFileManagementService } from 'src/services/audio-file-management.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private audioFileService: AudioFileManagementService
  ) { }

  tableColumns: { name: string, value: string, type?: string }[] = [
    { name: "Image", value: "imagePath", type: "img" },
    { name: "Name", value: "name", type: "text" },
    { name: "Description", value: "desc", type: "text" },
    { name: "File", value: "audioFilePath", type: "audio" },
    { name: "Actions", value: "", type: "text" }
  ]

  songsData: any = []

  ngOnInit(): void {
    this.getSongsList();
  }

  getSongsList() {
    this.audioFileService.getAllSongs().subscribe(response => {
      this.songsData = response;
    })
  }

  addSongPopup() {
    let modalRef = this.modalService.open(AddFileModalComponent);
    modalRef.result.then(res => {
      this.getSongsList();
    })
  }

  editSong(id: string) {
    let modalRef = this.modalService.open(AddFileModalComponent);
    modalRef.componentInstance.editId = id;
    modalRef.result.then(res => {
      this.getSongsList();
    })
  }


  deleteSong(id: string) {
    this.audioFileService.deleteSong({ _id: id }).subscribe(response => {
      this.getSongsList();
    })
  }
}


