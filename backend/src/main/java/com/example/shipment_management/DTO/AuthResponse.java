package com.example.shipment_management.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class AuthResponse {
    public long user_id;
    public String email;
    public String token;
    public boolean isAdmin;
}
