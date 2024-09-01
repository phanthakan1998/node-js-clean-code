import { ProcessPaymentDtoInput } from "../domain/dto/payment.dto";
import { Payment } from "../domain/entities/Payment";
import { PaymentRepository } from "../domain/interfaces/PaymentRepository";

export class PaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async processPayment(paymentInput: ProcessPaymentDtoInput): Promise<Payment> {
    const { cvv, expiredDate, cardName, cardNumber, price, bookingId } =
      paymentInput;
    this.validateCvv(cvv);
    this.validateExpiredDate(expiredDate);

    return await this.paymentRepository.processPayment(
      cardName,
      cardNumber,
      price,
      bookingId
    );
  }

  private validateCvv(cvv: string): void {
    if (!/^\d{3,4}$/.test(cvv)) {
      throw new Error("Invalid CVV.");
    }
  }

  private validateExpiredDate(expiredDate: string): void {
    const [month, year] = expiredDate.split("/").map(Number);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    if (
      month < 1 ||
      month > 12 ||
      year < currentYear ||
      (year === currentYear && month < currentMonth)
    ) {
      throw new Error("Expired credit card.");
    }
  }
}
