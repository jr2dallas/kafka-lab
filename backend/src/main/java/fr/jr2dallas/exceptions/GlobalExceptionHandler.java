package fr.jr2dallas.exceptions;

import fr.jr2dallas.kafkalab.generated.model.ErrorCode;
import fr.jr2dallas.kafkalab.generated.model.ErrorResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Map<String, ErrorCode> FIELD_ERROR_CODES = Map.of(
            "count:Min",            ErrorCode.INVALID_MESSAGE_COUNT,
            "payloadSizeBytes:Min", ErrorCode.INVALID_PAYLOAD_SIZE,
            "payloadSizeBytes:Max", ErrorCode.PAYLOAD_TOO_LARGE
    );

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorResponse> handleAppException(AppException ex) {
        return buildError(ex.getCode());
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {

        ErrorCode code = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(fe -> {
                    String[] codes = fe.getCodes();
                    String constraint = codes != null && codes.length > 0
                            ? codes[codes.length - 1]
                            : "";
                    return FIELD_ERROR_CODES.getOrDefault(
                            fe.getField() + ":" + constraint,
                            ErrorCode.VALIDATION_ERROR
                    );
                })
                .orElse(ErrorCode.VALIDATION_ERROR);

        ErrorResponse response = new ErrorResponse();
        response.setCode(code);
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity<ErrorResponse> buildError(ErrorCode code) {
        ErrorResponse response = new ErrorResponse();
        response.setCode(code);
        return ResponseEntity.badRequest().body(response);
    }
}