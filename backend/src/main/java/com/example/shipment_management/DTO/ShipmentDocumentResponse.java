package com.example.shipment_management.DTO;

import com.example.shipment_management.enums.VerificationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentDocumentResponse {
    private Long id;
    private String doctype;
    private String fileUrl;
    private VerificationStatus status;
    private String notes;
    private LocalDateTime uploadedAt;
}
