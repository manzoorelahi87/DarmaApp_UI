import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) { }

  public getBoardMemberDetails(): Observable<any> {   
    const url = 'https://opensheet.elk.sh/1riBNlzGBQqMcFvUU7UEdO1SfRSGIWC5M-kFp3illV0M/Sheet1'
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;          
        })
      );
  }


  public getEventPhotos(): Observable<any> {
    const url = 'https://opensheet.elk.sh/1riBNlzGBQqMcFvUU7UEdO1SfRSGIWC5M-kFp3illV0M/Sheet2'
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }


}
