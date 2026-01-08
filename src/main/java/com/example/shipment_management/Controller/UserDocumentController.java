package com.example.shipment_management.Controller;

import com.example.shipment_management.AuthUtil;
import com.example.shipment_management.DTO.ShipmentDocumentRequest;
import com.example.shipment_management.Service.UserDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserDocumentController {
    private final UserDocumentService userDocumentService;
    private final AuthUtil authutil;

    @PostMapping("/shipments/{shipmentId}/documents")
    public ResponseEntity<?> upload(
            @RequestHeader("token") String token,
            @PathVariable Long shipmentId,
            @RequestBody ShipmentDocumentRequest req) {
        if (!authutil.validateToken(token)) {
            return ResponseEntity.status(403).body("Invalid token");
        }

        Long userId = authutil.extractUserId(token);
        return userDocumentService.uploadDocument(userId, shipmentId, req);
    }

    @GetMapping("/shipments/{shipmentId}/documents")
    public ResponseEntity<?> list(
            @RequestHeader("token") String token,
            @PathVariable Long shipmentId) {
        if (!authutil.validateToken(token)) {
            return ResponseEntity.status(403).body("Invalid token");
        }

        Long userId = authutil.extractUserId(token);
        return userDocumentService.listDocuments(userId, shipmentId);
    }

    @GetMapping("/shipments/{shipmentId}/documents/{docId}")
    public ResponseEntity<?> get(
            @RequestHeader("token") String token,
            @PathVariable Long shipmentId,
            @PathVariable Long docId) {
        if (!authutil.validateToken(token)) {
            return ResponseEntity.status(403).body("Invalid token");
        }

        Long userId = authutil.extractUserId(token);
        return userDocumentService.getDocument(userId, docId);
    }

    @GetMapping("/shipments/{shipmentId}/documents/{docId}/view")
    public ResponseEntity<?> view(
            @RequestHeader("token") String token,
            @PathVariable Long shipmentId,
            @PathVariable Long docId) {
        if (!authutil.validateToken(token)) {
            return ResponseEntity.status(403).body("Invalid token");
        }

        Long userId = authutil.extractUserId(token);
        return userDocumentService.viewDocument(userId, docId);
    }

    @DeleteMapping("/shipments/{shipmentId}/documents/{docId}")
    public ResponseEntity<?> delete(
            @RequestHeader("token") String token,
            @PathVariable Long shipmentId,
            @PathVariable Long docId) {
        if (!authutil.validateToken(token)) {
            return ResponseEntity.status(403).body("Invalid token");
        }

        Long userId = authutil.extractUserId(token);
        return userDocumentService.deleteDocument(userId, docId);
    }
}
