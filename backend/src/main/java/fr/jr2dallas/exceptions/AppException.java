package fr.jr2dallas.exceptions;

import fr.jr2dallas.kafkalab.generated.model.ErrorCode;

public class AppException extends RuntimeException {
    private final ErrorCode code;

    public AppException(ErrorCode code) {
        super(code.name());
        this.code = code;
    }

    public ErrorCode getCode() { return code; }
}