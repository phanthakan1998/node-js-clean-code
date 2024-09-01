export interface ProcessPaymentDtoInput {
  cvv: string;
  cardName: string;
  cardNumber: string;
  expiredDate: string;
  price: number;
  bookingId: string;
}
