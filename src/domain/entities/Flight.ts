export class Flight {
  id: string;
  originId: string;
  destinationId: string;
  departureDateTime: Date | string | number;
  arrivalDateTime: Date | string | number;
  originFullName: string;
  originShortName: string;
  destinationFullName: string;
  destinationShortName: string;
  airline: string;
  status: string;
  price: number;

  constructor(
    id: string,
    originId: string,
    destinationId: string,
    departureDateTime: Date,
    arrivalDateTime: Date,
    originFullName: string,
    originShortName: string,
    destinationFullName: string,
    destinationShortName: string,
    airline: string,
    status: string,
    price: number
  ) {
    this.id = id;
    this.originId = originId;
    this.destinationId = destinationId;
    this.departureDateTime = departureDateTime;
    this.arrivalDateTime = arrivalDateTime;
    this.originFullName = originFullName;
    this.originShortName = originShortName;
    this.destinationFullName = destinationFullName;
    this.destinationShortName = destinationShortName;
    this.airline = airline;
    this.status = status;
    this.price = Number(price);
  }
}
export class Destinations {
  id: string;
  fullName: string;
  shortName: string;

  constructor(id: string, fullName: string, shortName: string) {
    this.id = id;
    this.fullName = fullName;
    this.shortName = shortName;
  }
}

export class Origins {
  id: string;
  fullName: string;
  shortName: string;

  constructor(id: string, fullName: string, shortName: string) {
    this.id = id;
    this.fullName = fullName;
    this.shortName = shortName;
  }
}
