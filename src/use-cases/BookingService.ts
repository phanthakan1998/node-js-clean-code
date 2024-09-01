import { CreateBookingInput } from "../domain/dto/booking.dto";
import { Booking, BookingInformation } from "../domain/entities/Booking";
import { FlightRepository } from "../domain/interfaces/FlightRepository";
import { PaymentRepository } from "../domain/interfaces/PaymentRepository";
import { BookingRepository } from "../domain/interfaces/BookingRepository";

export class BookingUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private flightRepository: FlightRepository,
    private bookingRepository: BookingRepository
  ) {}

  async createBooking(
    createBookingInput: CreateBookingInput
  ): Promise<Booking> {
    const {
      bookingId,
      passengerName,
      passengerLastName,
      flightId,
      paymentId,
      bookingDate,
      price,
      passengerId,
    } = createBookingInput;

    return this.bookingRepository.createBooking(
      bookingId,
      passengerName,
      passengerLastName,
      flightId,
      paymentId,
      bookingDate,
      price,
      passengerId
    );
  }

  async getBookingInformation(
    bookingId: string
  ): Promise<BookingInformation | null> {
    return await this.bookingRepository.getBookingById(bookingId);
  }

  private async validateFlightAndPayment(
    flightId: string,
    paymentId: string
  ): Promise<void> {
    const flightDetail = await this.flightRepository.getFlightById(flightId);
    if (!flightDetail) {
      throw new Error("Flight not found");
    }

    const paymentDetail = await this.paymentRepository.getPaymentDetail(
      paymentId
    );
    if (!paymentDetail) {
      throw new Error("Payment not found");
    }

    if (paymentDetail.status !== "success") {
      throw new Error("Payment is not successful");
    }
  }
}
