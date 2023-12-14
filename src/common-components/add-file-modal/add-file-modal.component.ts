import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AudioFileManagementService } from 'src/services/audio-file-management.service';

@Component({
  selector: 'app-add-file-modal',
  templateUrl: './add-file-modal.component.html',
  styleUrls: ['./add-file-modal.component.scss']
})
export class AddFileModalComponent implements OnInit {

  public isSubmitted = false;
  public addSongForm!: FormGroup;
  public formArray = [
    { label: "Name", formControlName: "name", placeholder: "Song name", type: "textField", reqErrMsg: "Please enter Song name." },
    { label: "Description", formControlName: "desc", type: "textField", reqErrMsg: "Please enter description." },
    { label: "Cover Image", formControlName: "coverImage", type: "imageFile", reqErrMsg: "Please select an image." },
    { label: "Song", formControlName: "audioFile", placeholder: "Select Song", type: "audioFile", reqErrMsg: "Please select a Song." },
  ];
  private editId?: string;
  private selectedImage: any;
  private selectedAudio: any;

  constructor(
    private formBuilder: FormBuilder,
    private audioFileService: AudioFileManagementService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.addSongForm = this.initForm();
    if (this.editId) {
      this.getSongById(this.editId);
    }
  }

  initForm() {
    return this.formBuilder.group({
      name: ["", [Validators.required]],
      desc: ["", [Validators.required]],
      coverImage: ["", [Validators.required]],
      audioFile: ["", [Validators.required]],
    })
  }

  getSongById(id: string) {
    this.audioFileService.getSongById(id).subscribe(response => {
      console.log()
      this.addSongForm.patchValue(response);
    })
  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit() {
    this.isSubmitted = true;
    debugger
    if (this.addSongForm.valid) {
      let fd = new FormData();
      if (this.selectedImage) {
        fd.append('coverImage', this.selectedImage, this.selectedImage.name);
      }
      if (this.selectedAudio) {
        fd.append('audioFile', this.selectedAudio, this.selectedAudio.name);
      }
      fd.append('name', this.addSongForm.value.name);
      fd.append('desc', this.addSongForm.value.desc);
      if (this.editId) {
        this.audioFileService.editSong(fd, this.editId).subscribe(response => {
          this.activeModal.close();
        })
      } else {
        this.audioFileService.addSong(fd).subscribe(response => {
          this.activeModal.close();
        })
      }
    }
  }

  onAudioFileSelect(event: any) {
    if (event && event.target && event.target.files.length > 0) {
      this.selectedAudio = event.target.files[0]
    }
  }

  onImageFileSelect(event: any) {
    if (event && event.target && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0]
    }
  }

}
