package com.example.shipment_management.Service;

import com.example.shipment_management.DTO.AdminRequest;
import com.example.shipment_management.Repository.ShipmentDocumentRepository;
import com.example.shipment_management.Repository.ShipmentRepository;
import com.example.shipment_management.Repository.UserRepository;
import com.example.shipment_management.enums.ShipmentStatus;
import com.example.shipment_management.enums.VerificationStatus;
import com.example.shipment_management.model.Shipment;
import com.example.shipment_management.model.ShipmentDocument;
import com.example.shipment_management.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ShipmentRepository shipmentRepository;
    private final ShipmentDocumentRepository shipmentDocumentRepository;

    public ResponseEntity<?> getShipmentByStatus(ShipmentStatus status) {
        if(status==null){
            return ResponseEntity.status(200).body(shipmentRepository.findAll());
        }
        return ResponseEntity.status(200).body(shipmentRepository.findByStatus(status));
    }
    public ResponseEntity<?> getDocumentsByShipmentId(Long shipmentId) {
        List<ShipmentDocument> docs = shipmentDocumentRepository.findByShipmentId(shipmentId);
        return ResponseEntity.ok(docs);
    }

    public ResponseEntity<?> updateShipmentStatus(Long shipmentId, Boolean approved) {
        Shipment shipment=shipmentRepository.findById(shipmentId).orElse(null);
        if(shipment==null){
            return ResponseEntity.status(403).body("Shipment not found...");
        }
        if(approved){
            shipment.setStatus(ShipmentStatus.APPROVED);
        }else{
            shipment.setStatus(ShipmentStatus.REJECTED);
        }
        shipmentRepository.save(shipment);
        return ResponseEntity.status(200).body(shipment);
    }

    public ResponseEntity<?> updateDocumentStatus(Long shipmentId, Long docId, Boolean verify, String note) {
        ShipmentDocument doc=shipmentDocumentRepository.findById(docId).orElse(null);
        if(doc==null){
            return ResponseEntity.status(403).body("Document not found...");
        }
        if (!doc.getShipment().getId().equals(shipmentId)) {
            return ResponseEntity.status(400).body("Document does not belong to this shipment");
        }


        if(verify) {
            doc.setVerificationStatus(VerificationStatus.VERIFIED);
        }else{
            doc.setVerificationStatus(VerificationStatus.REJECTED);
        }
        doc.setVerifiedAt(LocalDateTime.now());
        doc.setNotes(note);
        shipmentDocumentRepository.save(doc);

        return ResponseEntity.status(200).body(doc);
    }

    public ResponseEntity<?> getDocumentForAdmin(Long shipmentId, Long docId) {
        ShipmentDocument doc = shipmentDocumentRepository.findById(docId).orElse(null);

        if (doc == null) {
            return ResponseEntity.status(404).body("Document not found");
        }

        if (!doc.getShipment().getId().equals(shipmentId)) {
            return ResponseEntity.badRequest().body("Document does not belong to this shipment");
        }

        return ResponseEntity.status(200).body(doc);
    }
}
