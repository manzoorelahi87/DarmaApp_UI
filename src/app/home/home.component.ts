import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleService } from '../google.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent  {


    constructor(private csv: GoogleService) { }
    homePhotoUrls = [];

    boardMembers = [];

    ngOnInit() {

        this.csv.getBoardMemberDetails().subscribe((res) => {
            console.log(res);
            this.boardMembers = res;
          });

        this.csv.getEventPhotos().subscribe((res)=>{

            this.homePhotoUrls = res;
            // res.forEach(item => {
            //   this.homePhotoUrls.push(item.Photolinks);
            // });          
          });
    }

    imageObject = [{
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
        title: 'Hummingbirds are amazing creatures'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
        title: 'Example with title.'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
        title: 'Hummingbirds are amazing creatures'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
    }, {
        image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
        thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
        title: 'Example two with title.'
    }];

}
