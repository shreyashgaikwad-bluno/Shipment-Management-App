package com.example.shipment_management.Controller;

import com.example.shipment_management.AuthUtil;
import com.example.shipment_management.DTO.ShipmentRequest;
import com.example.shipment_management.Service.UserShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/shipments")
@RequiredArgsConstructor
public class UserShipmentController {
    private final UserShipmentService userShipmentService;
    private final AuthUtil authUtil;

    @PostMapping
    public ResponseEntity<?> createShipment(@RequestHeader("Authorization") String token , @RequestBody ShipmentRequest req){
        token = token.substring(7);
        if(!authUtil.validateToken(token)){
            return ResponseEntity.status(403).body("Invalid Token");
        }
        Long userid=authUtil.extractUserId(token);
        return userShipmentService.createShipment(userid,req);

    }

    @GetMapping
    public ResponseEntity<?> getMyShipments(@RequestHeader("Authorization") String token){
        token = token.substring(7);
        if(!authUtil.validateToken(token)){
            return ResponseEntity.status(403).body("Invalid Token");
        }
        Long userid=authUtil.extractUserId(token);
        return userShipmentService.getMyShipments(userid);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShipmentById(@RequestHeader("Authorization") String token, @PathVariable Long id){
        token = token.substring(7);
        if(!authUtil.validateToken(token)){
            return ResponseEntity.status(403).body("Invalid Token");
        }
        Long userid=authUtil.extractUserId(token);
        return userShipmentService.getShipmentByid(userid,id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateShipmentById(@RequestHeader("Authorization") String token, @PathVariable Long id,@RequestBody ShipmentRequest req){
        token = token.substring(7);
        if(!authUtil.validateToken(token)){
            return ResponseEntity.status(403).body("Invalid Token");
        }
        Long userid=authUtil.extractUserId(token);
        return userShipmentService.updateShipmentByid(userid,id,req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete( @RequestHeader("Authorization") String token,@PathVariable Long id) {
        token = token.substring(7);
        if (!authUtil.validateToken(token)) {
            return ResponseEntity.status(401).body("Invalid token");
        }

        Long userId = authUtil.extractUserId(token);
        return userShipmentService.deleteShipmentById(userId, id);
    }
}
