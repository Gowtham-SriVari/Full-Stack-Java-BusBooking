package com.example.busbooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.busbooking.entity.Bus;

import java.util.List;

public interface BusRepository extends JpaRepository<Bus, Long> {

    List<Bus> findBySourceIgnoreCaseAndDestinationIgnoreCase(
            String source,
            String destination
    );
}
