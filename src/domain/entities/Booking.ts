export class Booking {
  bookingId: string;
  status: string;

  constructor(bookingId: string, status: string) {
    this.bookingId = bookingId;
    this.status = status;
  }
}

export class BookingInformation {
  bookingId: string;
  status: string;
  departureDateTime: Date | string | number;
  arrivalDateTime: Date | string | number;
  originFullName: string;
  originShortName: string;
  destinationFullName: string;
  destinationShortName: string;
  airline: string;
  bookingDate: Date | string | number;

  constructor(
    bookingId: string,
    status: string,
    departureDateTime: Date | string | number,
    arrivalDateTime: Date | string | number,
    originFullName: string,
    originShortName: string,
    destinationFullName: string,
    destinationShortName: string,
    airline: string,
    bookingDate: Date | string | number
  ) {
    this.bookingId = bookingId;
    this.status = status;
    this.departureDateTime = departureDateTime;
    this.arrivalDateTime = arrivalDateTime;
    this.originFullName = originFullName;
    this.originShortName = originShortName;
    this.destinationFullName = destinationFullName;
    this.destinationShortName = destinationShortName;
    this.airline = airline;
    this.bookingDate = bookingDate;
  }
}
