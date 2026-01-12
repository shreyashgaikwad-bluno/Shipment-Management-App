package com.example.shipment_management.DTO;

import com.example.shipment_management.enums.ShipmentStatus;
import jakarta.persistence.NamedStoredProcedureQueries;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentResponse {
    private Long id;
    private String originalCountry;
    private String destinationCountry;
    private ShipmentStatus status;
}
