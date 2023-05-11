package com.avocado.payment.exception;

import lombok.Getter;

@Getter
public class BusinessLogicException extends RuntimeException {
    ErrorCode errorCode;

    public BusinessLogicException(ErrorCode errorCode) {
        super();
        this.errorCode = errorCode;
    }
}
