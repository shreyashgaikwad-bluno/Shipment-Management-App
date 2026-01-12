package com.example.shipment_management.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

import com.example.shipment_management.AuthUtil;
import com.example.shipment_management.DTO.AuthResponse;
import com.example.shipment_management.DTO.LoginRequest;
import com.example.shipment_management.DTO.RegisterRequest;
import com.example.shipment_management.Repository.UserRepository;
import com.example.shipment_management.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class Authservice {
    private final UserRepository userRepository;
    private final AuthUtil authutil;

    public ResponseEntity<?> register(RegisterRequest req){
        User user=userRepository.findByEmail(req.email);
        if(user!=null){
            return ResponseEntity.status(403).body("Email already present...");
        }
        else{
            User tempuser=new User();
            tempuser.setName(req.name);
            tempuser.setEmail(req.email);
            tempuser.setPassword(authutil.hash(req.getPassword()));
            tempuser.setIsAdmin(false);

            userRepository.save(tempuser);
            return ResponseEntity.status(200).body("User registered successfully....");
        }
    }

    public ResponseEntity<?> login(LoginRequest req){
        if(authutil.isAdminCredentials(req.email,req.password)){
            String token=authutil.generateToken(0L,true);
            AuthResponse resp=new AuthResponse(0L,authutil.ADMIN_EMAIL,token,true);
            return ResponseEntity.status(200).body(resp);
        }
        else{
            User user=userRepository.findByEmail(req.email);
            if(user==null){
                return ResponseEntity.status(403).body("User Not Registered....");
            }
            if(!authutil.verify(req.password,user.getPassword())){
                return ResponseEntity.status(403).body("Password Incorrect");
            }
            String token=authutil.generateToken(user.getId(),false);
            AuthResponse resp=new AuthResponse(user.getId(),user.getEmail(),token,false);
            return ResponseEntity.status(200).body(resp);
        }
    }
    public ResponseEntity<?> me(String authHeader) {
        if (authHeader == null || authHeader.isEmpty()) {
            return ResponseEntity.status(403).body("Token missing");
        }
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(403).body("Token missing");
        }
        String token = authHeader.substring(7);
        if (!authutil.validateToken(token)) {
            return ResponseEntity.status(403).body("Expired token");
        }
        DecodedJWT jwt = JWT.decode(token);
        Boolean isAdmin = jwt.getClaim("isAdmin").asBoolean();
        if (isAdmin != null && isAdmin) {
            return ResponseEntity.ok(
                    new AuthResponse(
                            0L,
                            authutil.ADMIN_EMAIL,
                            token,
                            true
                    )
            );
        }
        Long userId = jwt.getClaim("userId").asLong();
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.ok(
                new AuthResponse(
                        user.getId(),
                        user.getEmail(),
                        token,
                        false
                )
        );
    }




}
