package weblab4.cool.weblab4.security.jwt;

public interface JwtFactory<U, T> {
    U create(T object);
}

