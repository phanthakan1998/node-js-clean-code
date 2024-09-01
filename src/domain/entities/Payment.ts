export class Payment {
  id: string;
  bookingId: string;
  status: string;

  constructor(id: string, bookingId: string, status: string) {
    this.id = id;
    this.bookingId = bookingId;
    this.status = status;
  }
}
