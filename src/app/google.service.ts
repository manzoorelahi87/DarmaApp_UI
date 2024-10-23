import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) { }

  public getBoardMemberDetails(): Observable<any> {   
    const url = 'https://opensheet.elk.sh/1oG2uICsqJM04SB56zxtGncdd26AaD28eWPXTHRJBASg/Board_Directors'
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          
          return res;          
        })
      );
  }

  public getCommitteMembers(): Observable<any> {
    const url = 'https://opensheet.elk.sh/1oG2uICsqJM04SB56zxtGncdd26AaD28eWPXTHRJBASg/Committee_Members'
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          
          return res;
        })
      );
  }


  public getEventPhotos(): Observable<any> {
    const url = 'https://opensheet.elk.sh/1oG2uICsqJM04SB56zxtGncdd26AaD28eWPXTHRJBASg/Event_Photos'
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          
          return res;
        })
      );
  }
  

  public getSubEventPhotos(): Observable<any> {
    const url = 'https://opensheet.elk.sh/1oG2uICsqJM04SB56zxtGncdd26AaD28eWPXTHRJBASg/Sub_Events_Photos'
    return this.http.get(url)
      .pipe(
        map((res: any) => {          
          return res;
        })
      );
  }

  public getProfilePhotos(): Observable<any> {
    const url = 'https://opensheet.elk.sh/1oG2uICsqJM04SB56zxtGncdd26AaD28eWPXTHRJBASg/Member_Photos'
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          
          return res;
        })
      );
  }

  public getHomeContent(): Observable<any> {
    const url = 'https://opensheet.elk.sh/1oG2uICsqJM04SB56zxtGncdd26AaD28eWPXTHRJBASg/Home_Content'
    return this.http.get(url)
      .pipe(
        map((res: any) => {      
          return res;
        })
      );
  }


}
