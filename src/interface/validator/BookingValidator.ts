import {
  IsString,
  IsInt,
  IsOptional,
  IsNumber,
  IsDate,
  ValidateIf,
} from "class-validator";

export class BookingValidator {
  @IsString()
  bookingId: string;

  @IsString()
  paymentId: string;

  @IsNumber()
  price: number;

  @IsString()
  flightId: string;

  @IsString()
  passengerName: string;

  @IsString()
  passengerLastName: string;

  @IsOptional()
  @IsString()
  passengerId?: string;

  @ValidateIf((o) => typeof o.bookingDate === "number")
  @IsInt({ message: "If bookingDate is a number, it must be a Unix timestamp" })
  @ValidateIf((o) => typeof o.bookingDate === "string")
  @IsString({
    message: "If bookingDate is a string, it must be a valid date string",
  })
  @ValidateIf((o) => o.bookingDate instanceof Date)
  @IsDate({
    message: "If bookingDate is a Date object, it must be a valid Date",
  })
  bookingDate: Date | string | number;

  constructor(
    bookingId: string,
    paymentId: string,
    price: number,
    flightId: string,
    passengerName: string,
    passengerLastName: string,
    bookingDate: Date | string | number,
    passengerId?: string
  ) {
    this.bookingId = bookingId;
    this.paymentId = paymentId;
    this.price = price;
    this.flightId = flightId;
    this.passengerName = passengerName;
    this.passengerLastName = passengerLastName;
    this.bookingDate = bookingDate;
    this.passengerId = passengerId;
  }
}
