import {
  IsString,
  Length,
  Matches,
  IsPositive,
  IsNumber,
} from "class-validator";

export class PaymentValidator {
  @IsString()
  @Length(3, 4)
  @Matches(/^\d+$/, { message: "CVV must be numeric" })
  cvv: string;

  @IsString()
  @Matches(/^[a-zA-Z\s]+$/, {
    message: "Card Name must only contain letters and spaces",
  })
  cardName: string;

  @IsString()
  @Length(16, 16, { message: "Card Number must be 16 digits" })
  @Matches(/^\d+$/, { message: "Card Number must be numeric" })
  cardNumber: string;

  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, {
    message: "Expired Date must be in MM/YYYY format",
  })
  expiredDate: string;

  @IsNumber()
  @IsPositive({ message: "Price must be a positive integer" })
  price: number;

  @IsString()
  bookingId: string;

  constructor(
    cvv: string,
    cardName: string,
    price: number,
    cardNumber: string,
    expiredDate: string,
    bookingId: string
  ) {
    this.cvv = cvv;
    this.cardName = cardName;
    this.price = price;
    this.cardNumber = cardNumber;
    this.expiredDate = expiredDate;
    this.bookingId = bookingId;
  }
}
