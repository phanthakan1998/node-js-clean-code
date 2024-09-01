import pool from "../database";
import { PaymentRepository } from "../../domain/interfaces/PaymentRepository";
import { Payment } from "../../domain/entities/Payment";

export class PaymentRepositoryImplementation implements PaymentRepository {
  async processPayment(
    cardName: string,
    cardNumber: string,
    price: number,
    bookingId: string
  ): Promise<Payment> {
    const last4CharCardNumber = this.mockTokenize(cardNumber);

    const query = `
      INSERT INTO payment (price, bookingid, cardnumber, cardname, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [price, bookingId, last4CharCardNumber, cardName, "success"];

    try {
      const result = await pool.query(query, values);
      const paymentData = result.rows[0];

      const payment: Payment = {
        bookingId: paymentData.bookingId,
        id: paymentData.id,
        status: "success",
      };

      return payment;
    } catch (error) {
      console.log({ error });

      throw new Error("Payment processing failed");
    }
  }

  async getPaymentDetail(paymentId: string): Promise<Payment> {
    const query = `
      SELECT * FROM payment WHERE id = $1;
    `;

    const values = [paymentId];

    try {
      const result = await pool.query(query, values);
      const paymentData = result.rows[0];

      if (!paymentData) {
        throw new Error("Payment not found");
      }

      const payment: Payment = {
        bookingId: paymentData.bookingid,
        id: paymentData.id,
        status: paymentData.status,
      };

      return payment;
    } catch (error) {
      throw new Error("Failed to retrieve payment details");
    }
  }

  private mockTokenize(cardNumber: string): string {
    return cardNumber.slice(-4);
  }
}
