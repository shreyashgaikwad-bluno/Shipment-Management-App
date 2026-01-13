package com.example.shipment_management.Repository;

import com.example.shipment_management.model.ShipmentDocument;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShipmentDocumentRepository extends JpaRepository<ShipmentDocument,Long>{
    List<ShipmentDocument> findByShipmentId(Long shipmentId);

    @Modifying
    @Transactional
    @Query("DELETE FROM ShipmentDocument sd WHERE sd.shipment.id = :shipmentId")
    void deleteByShipmentId(Long shipmentId);
}
