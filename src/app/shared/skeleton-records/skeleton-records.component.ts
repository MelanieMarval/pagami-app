import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-skeleton-records',
    templateUrl: './skeleton-records.component.html',
    styleUrls: ['./skeleton-records.component.scss'],
})
export class SkeletonRecordsComponent implements OnInit {

    dummies = [1, 2, 3, 4, 5];

    constructor() {
    }

    async ngOnInit() {
    }

}
