import { Flight, Destinations, Origins } from "../entities/Flight";

export interface FlightRepository {
  getAllDestination(): Promise<Destinations[]>;
  getAllOrigin(): Promise<Origins[]>;
  getSearchFlight(
    originId: string,
    destinationId: string,
    startDate: Date | string | number
  ): Promise<Flight[]>;
  getFlightById(flightId: string): Promise<Flight | null>;
}
