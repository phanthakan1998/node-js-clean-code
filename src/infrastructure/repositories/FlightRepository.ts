import pool from "../database";
import { Flight, Destinations, Origins } from "../../domain/entities/Flight";
import { FlightRepository } from "../../domain/interfaces/FlightRepository";

export class FlightRepositoryImplementation implements FlightRepository {
  async getAllDestination(): Promise<Destinations[]> {
    const query = `
      SELECT id, fullName, shortName
      FROM destinations
    `;

    const result = await pool.query(query);

    return result.rows.map(
      (row) => new Destinations(row.id, row.fullname, row.shortname)
    );
  }

  async getSearchFlight(
    originId: string,
    destinationId: string,
    startDate: Date | string | number
  ): Promise<Flight[]> {
    const query = `
      SELECT 
        flights.id,
        flights.origin_id,
        flights.destination_id,
        flights.departure_date,
        flights.arrival_date,
        flights.status,
        flights.airline,
        flights.price,
        origins.fullname AS origin_fullname,
        origins.shortname AS origin_shortname,
        destinations.fullname AS destination_fullname,
        destinations.shortname AS destination_shortname
      FROM flights
      JOIN Origins AS origins ON flights.origin_id = origins.id
      JOIN Destinations AS destinations ON flights.destination_id = destinations.id
      WHERE flights.origin_id = $1
        AND flights.destination_id = $2
        AND DATE(to_timestamp(flights.departure_date)) <= DATE(to_timestamp($3));
    `;

    const startTimestamp =
      typeof startDate === "number"
        ? startDate
        : Math.floor(new Date(startDate).getTime() / 1000);

    const result = await pool.query(query, [
      originId,
      destinationId,
      startTimestamp,
    ]);

    return result.rows.map(
      (row) =>
        new Flight(
          row.id,
          row.origin_id,
          row.destination_id,
          row.departure_date,
          row.arrival_date,
          row.origin_fullname,
          row.origin_shortname,
          row.destination_fullname,
          row.destination_shortname,
          row.airline,
          row.status,
          row.price
        )
    );
  }

  async getAllOrigin(): Promise<Origins[]> {
    const query = `
      SELECT id, fullName, shortName
      FROM Origins
    `;

    const result = await pool.query(query);

    return result.rows.map(
      (row) => new Destinations(row.id, row.fullname, row.shortname)
    );
  }

  async getFlightById(flightId: string): Promise<Flight | null> {
    const query = `
      SELECT 
        flights.id,
        flights.origin_id,
        flights.destination_id,
        flights.departure_date,
        flights.arrival_date,
        flights.status,
        flights.airline,
        origins.fullname AS origin_fullname,
        origins.shortname AS origin_shortname,
        destinations.fullname AS destination_fullname,
        destinations.shortname AS destination_shortname
      FROM flights
      JOIN Origins AS origins ON flights.origin_id = origins.id
      JOIN Destinations AS destinations ON flights.destination_id = destinations.id
      WHERE flights.id = $1
    `;

    const result = await pool.query(query, [flightId]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return new Flight(
      row.id,
      row.origin_id,
      row.destination_id,
      row.departure_date,
      row.arrival_date,
      row.origin_fullname,
      row.origin_shortname,
      row.destination_fullname,
      row.destination_shortname,
      row.airline,
      row.status,
      row.price
    );
  }
}
