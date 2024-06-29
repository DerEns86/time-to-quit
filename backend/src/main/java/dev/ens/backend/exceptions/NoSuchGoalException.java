package dev.ens.backend.exceptions;

public class NoSuchGoalException extends RuntimeException{
    public NoSuchGoalException(String message) {
        super(message);
    }
}
