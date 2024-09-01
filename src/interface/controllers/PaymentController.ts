import { NextFunction, Request, Response } from "express";
import { decryptWithPrivateKey } from "../../infrastructure/security/asymmetricEncryption";
import { ProcessPaymentDtoInput } from "../../domain/dto/payment.dto";
import { PaymentValidator } from "../validator/PaymentValidator";
import { PaymentRepositoryImplementation } from "../../infrastructure/repositories/PaymentRepository";
import { PaymentUseCase } from "../../use-cases/PaymentService";
import { validateInput } from "../../utils/validation";
import logger from "../../infrastructure/logger";
import { sendResponse } from "../../utils/common";

const paymentRepository = new PaymentRepositoryImplementation();
const paymentUseCase = new PaymentUseCase(paymentRepository);

export class PaymentController {
  static async processPayment(req: Request, res: Response, next: NextFunction) {
    logger.info("Handling POST request to /payment");

    try {
      const { cvv, cardName, cardNumber, expiredDate, price, bookingId } =
        req.body;

      logger.info("Decrypting data for validation", {
        encryptedData: { cvv, cardName, cardNumber, expiredDate },
      });

      const decryptedCvv = decryptWithPrivateKey(cvv);
      const decryptedCardName = cardName;
      const decryptedCardNumber = decryptWithPrivateKey(cardNumber);
      const decryptedExpiredDate = decryptWithPrivateKey(expiredDate);

      logger.debug("Decrypted values", {
        decryptedCvv,
        decryptedCardName,
        decryptedCardNumber,
      });

      const paymentDto = new PaymentValidator(
        decryptedCvv,
        decryptedCardName,
        price,
        decryptedCardNumber,
        decryptedExpiredDate,
        bookingId
      );

      logger.info("Validating payment data");
      const isValid = await validateInput(paymentDto, next);

      if (!isValid) {
        logger.warn("Validation failed");
        return;
      }

      const paymentDtoInput: ProcessPaymentDtoInput = {
        cvv: decryptedCvv,
        cardName: decryptedCardName,
        cardNumber: decryptedCardNumber,
        expiredDate,
        price,
        bookingId,
      };

      const result = await paymentUseCase.processPayment(paymentDtoInput);

      logger.info("Payment processed successfully");
      sendResponse(res, result, 201, "Approved Payment");
    } catch (error) {
      logger.error("Error processing payment", { error });
      next(error);
    }
  }
}
