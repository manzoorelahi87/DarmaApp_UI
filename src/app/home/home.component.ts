import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleService } from '../google.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    constructor(private csv: GoogleService) { }
    homePhotoUrls = [];
    boardMembers = [];
    committeMembers = [];
    imageObject1 = [];
    subEvents = [];
    imageObject = [];
    notificationMessage: any;
    homeContent: any;
    historyContent: any;   
    videoObject: Array<object> = [{
        video: 'assets/Darma.mp4' // Youtube url
    }];

    ngOnInit() {

        this.csv.getBoardMemberDetails().subscribe((res) => {
            this.boardMembers = res;
        });

        this.csv.getCommitteMembers().subscribe((res) => {
            this.committeMembers = res;
            this.createImageObject();
        });

        this.csv.getEventPhotos().subscribe((res) => {
            this.homePhotoUrls = res;
        });

        this.csv.getHomeContent().subscribe((res) => {
            if (res[0].section === 'header'){
                this.homeContent = res[0].content;
            }
            if (res[1].section === 'notification'){
                this.notificationMessage = res[1].content;                
            }
            if (res[2].section === 'history'){
                this.historyContent = res[2].content;                
            }
        });

        this.csv.getSubEventPhotos().subscribe((res) => {
            this.subEvents = res;
            this.createSubImageObject();
        });
    }

    createSubImageObject() {
        for (let sub of this.subEvents) {
            const data = {
                image: sub.photoUrl,
                thumbImage: sub.photoUrl,
                title: sub.title                
            }
            this.imageObject.push(data);            
        }
        const data1 = {
            video: "assets/Darma.mp4",
            posterImage: this.subEvents[4].photoUrl,
            title: 'Slideshow 2023'
        }
        this.imageObject.push(data1);       
    }

    createImageObject() {
        for (let member of this.committeMembers) {
            const data = {
                image: member.imageUrl,
                thumbImage: member.imageUrl,
                title: member.name
            }
            this.imageObject1.push(data);
        }
    } 

}
