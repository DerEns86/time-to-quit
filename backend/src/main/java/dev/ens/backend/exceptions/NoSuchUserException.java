package dev.ens.backend.exceptions;

public class NoSuchUserException extends RuntimeException{
    public NoSuchUserException(String message) {
        super(message);
    }
}
