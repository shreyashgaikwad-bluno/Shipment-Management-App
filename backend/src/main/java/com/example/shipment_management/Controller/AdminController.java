package com.example.shipment_management.Controller;

import com.example.shipment_management.AuthUtil;
import com.example.shipment_management.DTO.AdminRequest;
import com.example.shipment_management.Service.AdminService;
import com.example.shipment_management.enums.ShipmentStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;
    private final AuthUtil authUtil;

    @GetMapping("/shipments")
    public ResponseEntity<?> getShipmentByStatus(@RequestHeader("Authorization") String token, @RequestParam(required = false) ShipmentStatus status){
        token = token.substring(7);
        if(!authUtil.validateToken(token)){
            return ResponseEntity.status(403).body("Invalid Token...");
        }
        if(!authUtil.isAdmin(token)){
            return ResponseEntity.status(403).body("You are not admin.....");
        }
        return adminService.getShipmentByStatus(status);
    }

    @GetMapping("/shipments/{shipmentId}/documents")
    public ResponseEntity<?> getDocumentsForAdmin(
            @RequestHeader("Authorization") String token,
            @PathVariable Long shipmentId
    ) {
        token = token.substring(7);

        if (!authUtil.validateToken(token)) {
            return ResponseEntity.status(403).body("Invalid Token");
        }

        if (!authUtil.isAdmin(token)) {
            return ResponseEntity.status(403).body("You are not admin");
        }

        return adminService.getDocumentsByShipmentId(shipmentId);
    }

    @GetMapping("/shipments/{shipmentId}/documents/{docId}")
    public ResponseEntity<?> getDocumentForAdmin(@RequestHeader("Authorization") String token,@PathVariable Long shipmentId,@PathVariable Long docId){
        token = token.substring(7);

        if (!authUtil.validateToken(token)) {
            return ResponseEntity.status(403).body("Invalid Token");
        }

        if (!authUtil.isAdmin(token)) {
            return ResponseEntity.status(403).body("You are not admin");
        }
        return adminService.getDocumentForAdmin(shipmentId,docId);
    }
    @PostMapping("/shipments/{shipmentId}/status")
    public ResponseEntity<?> updateShipmentStatus(@RequestHeader("Authorization") String token,@PathVariable Long shipmentId, @RequestParam Boolean approved){
        token = token.substring(7);
        if(!authUtil.validateToken(token)){
            return ResponseEntity.status(403).body("Invalid Token...");
        }
        if(!authUtil.isAdmin(token)){
            return ResponseEntity.status(403).body("You are not admin.....");
        }
        return adminService.updateShipmentStatus(shipmentId,approved);
    }

    @PostMapping("/shipments/{shipmentId}/documents/{docId}/status")
    public ResponseEntity<?> updateDocumentStatus(@RequestHeader("Authorization") String token, @PathVariable Long shipmentId, @PathVariable Long docId, @RequestBody AdminRequest req){
        token = token.substring(7);
        if(!authUtil.validateToken(token)){
            return ResponseEntity.status(403).body("Invalid Token...");
        }
        if(!authUtil.isAdmin(token)){
            return ResponseEntity.status(403).body("You are not admin.....");
        }
        return adminService.updateDocumentStatus(shipmentId,docId,req.getApproved(),req.getNotes());
    }


}
