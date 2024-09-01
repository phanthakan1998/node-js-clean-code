export interface CreateBookingInput {
  bookingId: string;
  passengerName: string;
  passengerLastName: string;
  flightId: string;
  passengerId?: string;
  paymentId: string;
  bookingDate: Date | string | Number;
  price: number;
}
