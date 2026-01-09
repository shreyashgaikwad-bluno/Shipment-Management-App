package com.example.shipment_management.Controller;

import com.example.shipment_management.DTO.LoginRequest;
import com.example.shipment_management.DTO.RegisterRequest;
import com.example.shipment_management.Service.Authservice;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final Authservice authservice;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req){
        return authservice.register(req);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req){
        return authservice.login(req);
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader String authHeader){
        return authservice.me(authHeader);
    }

}
