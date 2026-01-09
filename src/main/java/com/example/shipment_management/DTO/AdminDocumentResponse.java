package com.example.shipment_management.DTO;

import com.example.shipment_management.enums.VerificationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdminDocumentResponse {
    private Long id;
    private String doctype;
    private String fileurl;
    private VerificationStatus status;
    private String notes;

}
