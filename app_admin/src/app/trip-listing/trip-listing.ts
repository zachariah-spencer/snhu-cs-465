import { Component, OnInit } from '@angular/core';
import { JsonPipe, CurrencyPipe, CommonModule } from '@angular/common';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-listing',
  providers: [TripData],
  imports: [ JsonPipe, CurrencyPipe, CommonModule, TripCard ],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {

    trips!: Trip[];
    message: string = '';

    constructor(private tripData: TripData) {
        console.log('trip-listing constructor');
    }

    private getStuff(): void {
        this.tripData.getTrips()
        .subscribe({
            next: (value: any) => {
                this.trips = value;
                if(value.length > 0)
                {
                    this.message = 'There are ' + value.length + ' trips available.';
                }
                else {
                    this.message = 'There were no trips retrieved from the database.';
                }
                console.log(this.message);
            },
            error: (error: any) => {
                console.log('Error: ' + error);
            }
        })
    }
    ngOnInit(): void {
        console.log('ngOnInit');
        this.getStuff();
    }

}
