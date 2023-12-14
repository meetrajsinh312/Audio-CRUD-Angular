import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioFileManagementService {

  baseUrl = "http://localhost:3000/"
  constructor(
    private http: HttpClient
  ) { }

  getAllSongs() {
    return this.http.get(this.baseUrl + "audio-file/get-all");
  }

  getSongById(id: string) {
    return this.http.get(this.baseUrl + "audio-file/get/" + id);
  }

  addSong(payload: any) {
    return this.http.post(this.baseUrl + "audio-file/add-song", payload);
  }

  deleteSong(payload: any) {
    return this.http.post(this.baseUrl + "audio-file/delete-song", payload);
  }

  editSong(payload: any, id: string) {
    return this.http.post(this.baseUrl + "audio-file/edit-song/" + id, payload);
  }
}
