package com.example.shipment_management.Controller;

import com.example.shipment_management.AuthUtil;
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
    public ResponseEntity<?> getShipmentByStatus(@RequestHeader String token, @RequestParam(required = false) ShipmentStatus status){
        if(!authUtil.validateToken(token)){
            return ResponseEntity.status(403).body("Invalid Token...");
        }
        if(!authUtil.isAdmin(token)){
            return ResponseEntity.status(403).body("You are not admin.....");
        }
        return adminService.getShipmentByStatus(status);
    }

    @PostMapping("/shipments/{shipmentId}/status")
    public ResponseEntity<?> updateShipmentStatus(@RequestHeader String token,@PathVariable Long shipmentId, @RequestParam Boolean approved){
        if(!authUtil.validateToken(token)){
            return ResponseEntity.status(403).body("Invalid Token...");
        }
        if(!authUtil.isAdmin(token)){
            return ResponseEntity.status(403).body("You are not admin.....");
        }
        return adminService.updateShipmentStatus(shipmentId,approved);
    }

    @PostMapping("/shipments/{shipmentId}/documents/{docId}/status")
    public ResponseEntity<?> updateDocumentStatus(@RequestHeader String token,@PathVariable Long shipmentId,@PathVariable Long docId,@RequestParam Boolean verify){
        if(!authUtil.validateToken(token)){
            return ResponseEntity.status(403).body("Invalid Token...");
        }
        if(!authUtil.isAdmin(token)){
            return ResponseEntity.status(403).body("You are not admin.....");
        }
        return adminService.updateDocumentStatus(shipmentId,docId,verify);
    }


}
