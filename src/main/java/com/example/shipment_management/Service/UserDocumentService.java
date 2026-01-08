package com.example.shipment_management.Service;

import com.example.shipment_management.DTO.ShipmentDocumentRequest;
import com.example.shipment_management.DTO.ShipmentDocumentResponse;
import com.example.shipment_management.Repository.ShipmentDocumentRepository;
import com.example.shipment_management.Repository.ShipmentRepository;
import com.example.shipment_management.enums.VerificationStatus;
import com.example.shipment_management.model.Shipment;
import com.example.shipment_management.model.ShipmentDocument;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDocumentService {
    private final ShipmentRepository shipmentRepository;
    private final ShipmentDocumentRepository shipmentDocumentRepository;

    public ResponseEntity<?> uploadDocument(Long userId, Long shipmentId, ShipmentDocumentRequest req) {
        Shipment shipment = shipmentRepository.findById(shipmentId).orElse(null);
        if (shipment == null) {
            return ResponseEntity.status(404).body("Shipment not found");
        }

        if (!shipment.getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).body("Not your shipment");
        }

        ShipmentDocument doc = new ShipmentDocument();
        doc.setShipment(shipment);
        doc.setDocType(req.getDoctype());
        doc.setFileUrl(req.getFileurl());
        doc.setNotes(req.getNotes());
        doc.setVerificationStatus(VerificationStatus.PENDING);

        shipmentDocumentRepository.save(doc);

        return ResponseEntity.ok("Document metadata saved");

    }

    public ResponseEntity<?> listDocuments(Long userId, Long shipmentId) {
        Shipment shipment = shipmentRepository.findById(shipmentId).orElse(null);
        if (shipment == null) {
            return ResponseEntity.status(404).body("Shipment not found");
        }

        if (!shipment.getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).body("Not your shipment");
        }

        List<ShipmentDocument> docs = shipmentDocumentRepository.findByShipmentId(shipmentId);

        return ResponseEntity.ok(
                docs.stream().map(d ->
                        new ShipmentDocumentResponse(
                                d.getId(),
                                d.getDocType(),
                                d.getFileUrl(),
                                d.getVerificationStatus(),
                                d.getNotes(),
                                d.getUploadedAt()
                        )
                ).toList()
        );
    }

    public ResponseEntity<?> getDocument(Long userId, Long docId) {
        ShipmentDocument doc = shipmentDocumentRepository.findById(docId).orElse(null);

        if (doc == null) {
            return ResponseEntity.status(404).body("Document not found");
        }

        if (!doc.getShipment().getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).body("Not your document");
        }

        return ResponseEntity.ok(
                new ShipmentDocumentResponse(
                        doc.getId(),
                        doc.getDocType(),
                        doc.getFileUrl(),
                        doc.getVerificationStatus(),
                        doc.getNotes(),
                        doc.getUploadedAt()
                )
        );
    }

    public ResponseEntity<?> viewDocument(Long userId, Long docId) {
        ShipmentDocument doc = shipmentDocumentRepository.findById(docId).orElse(null);

        if (doc == null) {
            return ResponseEntity.status(404).body("Document not found");
        }

        if (!doc.getShipment().getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).body("Not your document");
        }

        return ResponseEntity.ok(doc.getFileUrl());
    }

    public ResponseEntity<?> deleteDocument(Long userId, Long docId) {
        ShipmentDocument doc = shipmentDocumentRepository.findById(docId).orElse(null);

        if (doc == null) {
            return ResponseEntity.status(404).body("Document not found");
        }

        if (!doc.getShipment().getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).body("Not your document");
        }

        if (doc.getVerificationStatus() != VerificationStatus.PENDING) {
            return ResponseEntity.badRequest().body("Cannot delete verified/rejected document");
        }

        shipmentDocumentRepository.delete(doc);
        return ResponseEntity.ok("Document deleted");
    }
}
