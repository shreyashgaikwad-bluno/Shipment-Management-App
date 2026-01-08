package com.example.shipment_management.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShipmentDocumentRequest {
    private String doctype;
    private String fileurl;
    private String notes;
}
