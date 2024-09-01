import pool from "../database";
import { BookingRepository } from "../../domain/interfaces/BookingRepository";
import { Booking, BookingInformation } from "../../domain/entities/Booking";
import { FlightRepository } from "../../domain/interfaces/FlightRepository";
import { Flight } from "../../domain/entities/Flight";

export class BookingRepositoryImplementation implements BookingRepository {
  async createBooking(
    bookingId: string,
    passengerName: string,
    passengerLastName: string,
    flightId: string,
    paymentId: string,
    bookingDate: Date | string | number,
    price: number,
    passengerId?: string
  ): Promise<Booking> {
    const query = `
      INSERT INTO bookings (
        bookingid,
        passengername,
        passengerlastname,
        flightid,
        paymentid,
        bookingdate,
        price,
        passengerid,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING bookingid, status;
    `;

    const values = [
      bookingId,
      passengerName,
      passengerLastName,
      flightId,
      paymentId,
      bookingDate,
      price,
      passengerId || null,
      "confirmed",
    ];

    try {
      const result = await pool.query(query, values);
      const row = result.rows[0];

      const booking: Booking = {
        bookingId: row.bookingid,
        status: row.status,
      };

      return booking;
    } catch (error) {
      console.log({ error });

      throw new Error("Failed to create booking");
    }
  }

  async getBookingById(bookingId: string): Promise<BookingInformation | null> {
    const query = `
      SELECT
        b.bookingid,
        b.passengername,
        b.passengerlastname,
        b.flightid,
        b.paymentid,
        b.bookingdate,
        b.price,
        b.passengerid,
        b.status,
        f.departure_date AS departure_date,
        f.arrival_date AS arrival_date,
        o.fullname AS origin_fullname,
        o.shortname AS origin_shortname,
        d.fullname AS destination_fullname,
        d.shortname AS destination_shortname,
        f.airline AS airline
      FROM bookings b
      JOIN flights f ON b.flightid = f.id
      JOIN Origins o ON f.origin_id = o.id
      JOIN Destinations d ON f.destination_id = d.id
      WHERE b.bookingid = $1;
    `;

    try {
      const result = await pool.query(query, [bookingId]);
      if (result.rows.length === 0) {
        return null;
      }
      const row = result.rows[0];
      return new BookingInformation(
        row.bookingid,
        row.status,
        row.departure_date,
        row.arrival_date,
        row.origin_fullname,
        row.origin_shortname,
        row.destination_fullname,
        row.destination_shortname,
        row.airline,
        row.bookingdate
      );
    } catch (error) {
      throw new Error("Failed to fetch booking details");
    }
  }
}
