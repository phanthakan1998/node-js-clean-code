import { IsString, IsInt, Min } from "class-validator";

export class GetSearchFlightValidator {
  @IsString()
  originId: string;

  @IsString()
  destinationId: string;

  @IsInt({ message: "Start date must be an integer (Unix timestamp)" })
  @Min(0, { message: "Start date must be a positive integer" })
  startDate: number;

  constructor(originId: string, destinationId: string, startDate: number) {
    this.originId = originId;
    this.destinationId = destinationId;
    this.startDate = startDate;
  }
}
