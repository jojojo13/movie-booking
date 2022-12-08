import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from 'src/app/models/FileUpload';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private basePath = '/uploads';
  fileUrl = '';
  fileBehavior!: BehaviorSubject<boolean>;
  videoUploaded=false;
  videoUrl=''
  
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFireDatabase
  ) {

    this.fileBehavior = new BehaviorSubject<boolean>(false);
  }

  pushFileToStorage(
    fileUpload: FileUpload,
    candidatePath: string = ''
  ): Observable<number> {
    let filePath = '';
    if (candidatePath == '') {
      filePath = `${this.basePath}/${fileUpload.file.name}`;
    } else {
      filePath = `${this.basePath}/${candidatePath}/${fileUpload.file.name}`;
    }

    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            this.fileUrl = downloadURL;
            this.fileBehavior.next(true);
            fileUpload.name = fileUpload.file.name;
            
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();
    return uploadTask.percentageChanges() as Observable<number>;
  }
  pushFileToStorage2(
    fileUpload: FileUpload,
    candidatePath: string = ''
  ): Observable<number> {
    let filePath = '';
    if (candidatePath == '') {
      filePath = `${this.basePath}/${fileUpload.file.name}`;
    } else {
      filePath = `${this.basePath}/${candidatePath}/${fileUpload.file.name}`;
    }

    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            this.videoUrl = downloadURL;
             this.videoUploaded=true
        
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
       
            this.fileBehavior.next(true);
          });
        })
      )
      .subscribe();
    return uploadTask.percentageChanges() as Observable<number>;
  }
  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }
  popUpSuccess(msg:string) {
    Swal.fire({
      icon: 'success',
      title: msg,
      showConfirmButton: true,
   
    });
  }
  popUpFailed(msg: string) {
    Swal.fire({
      icon: 'error',
      title: msg,
      showConfirmButton: true,
    });
  }
}
