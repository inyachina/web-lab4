package weblab4.cool.weblab4.exceptions;

public class TokenNotProvidedException extends Exception {
    String message;

    public TokenNotProvidedException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
