import { Injectable, Inject } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private url: string) { }

  // postFile(file) {
  //   return this.http.post(`${this.url}/files/postFile`, file, { reportProgress: true });
  // }

  // deleteFile(filename, folder) {
  //   return this.http.post(`${this.url}/files/deleteFile/`, { filename, folder }, { reportProgress: true });
  // }

  // download(filename) {
  //   return this.http.get(`${this.url}/Visite/${filename}`);
  // }

  deleteFiles(filenames: string[], folder) {
    if (filenames.length === 0) {
      return of(null);
    }
    return this.http.post(`${this.url}/api/home/deleteFiles/`, { filenames, folder }, { reportProgress: true });
  }

  uploadFiles2(files: FormData, folder) {
    if (!files) {
      return of(null);
    }

    const uploadReq = new HttpRequest('POST', `${this.url}/api/home/uploadFiles/${folder}`, files, {
      reportProgress: true,
    });


    return this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        let progress = 0;
        progress += Math.round(100 * event.loaded / event.total);

        console.log(progress)
      } else if (event.type === HttpEventType.Response) {
        console.log((event.body));
      }
    });
    // .pipe( catchError(this.errorMgmt) );
  }

  uploadFiles(files: FormData, folder) {
    return this.http.post(`${this.url}/api/home/uploadFiles/${folder}`, files, {
      reportProgress: true,
      observe: 'events'
    });
  }


  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
