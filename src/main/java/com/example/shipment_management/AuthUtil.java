package com.example.shipment_management;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Date;

public class AuthUtil {

    // ===== SINGLE ADMIN CONFIG =====
    public static final String ADMIN_NAME = "System Admin";
    public static final String ADMIN_EMAIL = "admin@system.com";

    // password = admin123 (hash generated ONCE)
    private static final String ADMIN_PASSWORD_HASH =
            "$2a$12$REPLACE_WITH_REAL_HASH";

    // ===== JWT CONFIG =====
    private static final String SECRET =
            "sahfeigjaeeageaieaguehagrha4wfr4wq74325y4wuhfea";
    private static final long EXPIRY = 24 * 60 * 60 * 1000; // 24 hours
    private static final Algorithm algorithm = Algorithm.HMAC256(SECRET);

    // ===== PASSWORD UTILS =====
    public static String hash(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt(12));
    }

    public static boolean verify(String rawPassword, String hashedPassword) {
        return BCrypt.checkpw(rawPassword, hashedPassword);
    }

    // ===== ADMIN CHECK =====
    public static boolean isAdminCredentials(String email, String password) {
        return ADMIN_EMAIL.equals(email)
                && BCrypt.checkpw(password, ADMIN_PASSWORD_HASH);
    }

    // ===== JWT =====
    public static String generateToken(Long userId, boolean isAdmin) {
        return JWT.create()
                .withClaim("userId", userId)
                .withClaim("isAdmin", isAdmin)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRY))
                .sign(algorithm);
    }
}
