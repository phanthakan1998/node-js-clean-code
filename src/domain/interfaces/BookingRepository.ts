import { Booking, BookingInformation } from "../entities/Booking";

export interface BookingRepository {
  createBooking(
    bookingId: string,
    passengerName: string,
    passengerLastName: string,
    flightId: string,
    paymentId: string,
    bookingDate: Date | string | Number,
    price: number,
    passengerId?: string
  ): Promise<Booking>;
  getBookingById(bookingId: string): Promise<BookingInformation | null>;
}
