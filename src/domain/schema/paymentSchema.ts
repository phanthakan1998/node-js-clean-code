export const paymentSchema = {
  cvv: {
    trim: true,
    escape: true,
  },
  cardNumber: {
    trim: true,
    escape: true,
  },
  cardName: {
    trim: true,
    escape: true,
  },
  expiredDate: {
    trim: true,
    escape: true,
  },
  price: {
    isNumeric: true,
    toFloat: true,
  },
  bookingId: {
    trim: true,
    escape: true,
  },
};
