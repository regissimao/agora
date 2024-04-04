package br.com.agora.exception;

public class BadRequestException extends RuntimeException{
    private static final long serialVersionUID = -334234234234234L;

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, cause);
    }

    public BadRequestException(Throwable cause) {
        super(cause);
    }
}
