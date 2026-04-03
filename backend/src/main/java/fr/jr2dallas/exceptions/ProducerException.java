package fr.jr2dallas.exceptions;

import fr.jr2dallas.kafkalab.generated.model.ErrorCode;

public class ProducerException extends AppException {
    public ProducerException(ErrorCode code) { super(code); }
}