import { Flight, Destinations, Origins } from "../entities/Flight";
import { Payment } from "../entities/Payment";

export interface PaymentRepository {
  processPayment(
    cardName: string,
    cardNumber: string,
    price: number,
    bookingId: string
  ): Promise<Payment>;

  getPaymentDetail(paymentId: string): Promise<Payment>;
}
