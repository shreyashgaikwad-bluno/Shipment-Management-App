package com.example.shipment_management.Service;

import com.example.shipment_management.DTO.ShipmentRequest;
import com.example.shipment_management.Repository.ShipmentRepository;
import com.example.shipment_management.Repository.UserRepository;
import com.example.shipment_management.enums.ShipmentStatus;
import com.example.shipment_management.model.Shipment;
import com.example.shipment_management.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserShipmentService {
    private final ShipmentRepository shipmentRepository;
    private final UserRepository userRepository;


    public ResponseEntity<?> createShipment(Long userid, ShipmentRequest req) {
        User user=userRepository.findById(userid).orElse(null);


        if(user==null){
            return ResponseEntity.status(403).body("User id is incorrect....");
        }
        Shipment shipment=new Shipment();
        shipment.setUser(user);
        shipment.setStatus(ShipmentStatus.PENDING);
        shipment.setOriginCountry(req.getOriginCountry());
        shipment.setDestinationCountry(req.getDestinationCountry());

        shipmentRepository.save(shipment);
        return ResponseEntity.status(200).body(shipment);
    }

    public ResponseEntity<?> getMyShipments(Long userid) {
        System.out.println(userid);
        List<Shipment>  shipments= shipmentRepository.findByUserId(userid);
        return ResponseEntity.status(200).body(shipments);
    }

    public ResponseEntity<?> getShipmentByid(Long userid, Long shipmentid) {
        Shipment shipment=shipmentRepository.findById(shipmentid).orElse(null);
        if(shipment==null){
            return ResponseEntity.status(403).body("Shipment not found...");
        }
        if(!shipment.getUser().getId().equals(userid)){
            return ResponseEntity.status(403).body("Unauthorized...");
        }
        return ResponseEntity.status(200).body(shipment);
    }

    public ResponseEntity<?> updateShipmentByid(Long userid, Long shipmentid, ShipmentRequest req) {
        Shipment shipment = shipmentRepository.findById(shipmentid).orElse(null);

        if (shipment == null) {
            return ResponseEntity.status(403).body("Shipment not found");
        }
        if (!shipment.getUser().getId().equals(userid)) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        if (shipment.getStatus() != ShipmentStatus.PENDING) {
            return ResponseEntity.badRequest().body("Only PENDING shipments can be updated");
        }

        shipment.setOriginCountry(req.getOriginCountry());
        shipment.setDestinationCountry(req.getDestinationCountry());

        shipmentRepository.save(shipment);
        return ResponseEntity.ok("Updated Successfully.....");
    }

    public ResponseEntity<?> deleteShipmentById(Long userId, Long shipmentid) {
        Shipment shipment = shipmentRepository.findById(shipmentid).orElse(null);

        if (shipment == null) {
            return ResponseEntity.status(403).body("Shipment not found");
        }

        if (!shipment.getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        if (shipment.getStatus() != ShipmentStatus.PENDING) {
            return ResponseEntity.badRequest().body("Only PENDING shipments can be deleted");
        }

        shipmentRepository.delete(shipment);
        return ResponseEntity.ok("Deleted successfully");
    }
}
