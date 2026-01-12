package com.example.shipment_management.DTO;

import com.example.shipment_management.enums.ShipmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminShipmentResponse {
    private Long id;
    private String originCountry;
    private String destinationCountry;
    private ShipmentStatus status;
}
