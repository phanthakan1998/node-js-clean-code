import { GetSearchFlightInput } from "../domain/dto/flight.dto";
import { Flight, Destinations, Origins } from "../domain/entities/Flight";
import { FlightRepository } from "../domain/interfaces/FlightRepository";

export class FlightUseCase {
  constructor(private flightRepository: FlightRepository) {}

  async getAllDestination(): Promise<Destinations[]> {
    return await this.flightRepository.getAllDestination();
  }

  async getAllOrigin(): Promise<Origins[]> {
    return await this.flightRepository.getAllOrigin();
  }

  async getFlightById(flightId: string): Promise<Flight | null> {
    return await this.flightRepository.getFlightById(flightId);
  }
  async getSearchFlight(flightInput: GetSearchFlightInput): Promise<Flight[]> {
    return await this.flightRepository.getSearchFlight(
      flightInput.originId,
      flightInput.destinationId,
      flightInput.startDate
    );
  }
}
