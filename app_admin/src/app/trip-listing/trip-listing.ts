import { Component, OnInit } from '@angular/core';
import { JsonPipe, CurrencyPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  providers: [TripData],
  imports: [JsonPipe, CurrencyPipe, CommonModule, FormsModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  maxBudget: number | null = null;
  private totalTrips = 0;
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private authenticationService: Authentication
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  private loadTrips(): void {
    const budget = this.normalizeBudget(this.maxBudget);

    this.tripData.getTrips(budget ?? undefined).subscribe({
      next: (trips: Trip[]) => {
        this.trips = trips;

        if (budget === null) {
          this.totalTrips = trips.length;
        } else if (this.totalTrips === 0) {
          this.totalTrips = trips.length;
        }

        this.updateMessage(budget);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      },
    });
  }

  public applyBudgetFilter(): void {
    const budget = this.normalizeBudget(this.maxBudget);
    this.maxBudget = budget;
    this.loadTrips();
  }

  private updateMessage(budget: number | null): void {
    if (budget === null) {
      if (this.trips.length === 0) {
        this.message = 'There were no trips retrieved from the database.';
      } else {
        this.message = 'There are ' + this.trips.length + ' trips available.';
      }
      console.log(this.message);
      return;
    }

    if (this.trips.length === 0) {
      this.message = 'No trips match the current maximum budget.';
      console.log(this.message);
      return;
    }

    const total = this.totalTrips || this.trips.length;
    if (this.trips.length === total) {
      this.message =
        'Showing all ' + this.trips.length + ' trips within the selected budget.';
    } else {
      this.message =
        'Showing ' +
        this.trips.length +
        ' of ' +
        total +
        ' trips under the selected budget.';
    }

    console.log(this.message);
  }
  ngOnInit(): void {
    console.log('ngOnInit');
    this.loadTrips();
  }

  private normalizeBudget(value: number | null): number | null {
    if (value === null || Number.isNaN(value)) {
      return null;
    }

    return value < 0 ? 0 : value;
  }
}
