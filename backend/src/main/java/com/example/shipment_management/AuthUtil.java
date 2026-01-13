package com.example.shipment_management;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class AuthUtil {

    @Value("${admin.name}")
    public String ADMIN_NAME;

    @Value("${admin.email}")
    public String ADMIN_EMAIL;

    @Value("${admin.password.hash}")
    private String ADMIN_PASSWORD_HASH;

    @Value("${jwt.secret}")
    private String SECRET;

    @Value("${jwt.expiry}")
    private long EXPIRY;

    public String hash(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt(12));
    }

    public boolean verify(String rawPassword, String hashedPassword) {
        return BCrypt.checkpw(rawPassword, hashedPassword);
    }

    public boolean isAdminCredentials(String email, String password) {
        return ADMIN_EMAIL.equals(email)
                && BCrypt.checkpw(password, ADMIN_PASSWORD_HASH);
    }

    public String generateToken(Long userId, boolean isAdmin) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET);

        return JWT.create()
                .withClaim("userId", userId)
                .withClaim("isAdmin", isAdmin)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRY))
                .sign(algorithm);
    }

    public boolean validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            verifier.verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Long extractUserId(String token) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        return JWT.require(algorithm)
                .build()

                .verify(token)
                .getClaim("userId")
                .asLong();
    }

    public boolean isAdmin(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            return JWT.require(algorithm)
                    .build()
                    .verify(token)
                    .getClaim("isAdmin")
                    .asBoolean();
        } catch (Exception e) {
            return false;
        }
    }


}
