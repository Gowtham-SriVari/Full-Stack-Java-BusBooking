package com.example.busbooking.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.busbooking.entity.Booking;
import com.example.busbooking.entity.Bus;
import com.example.busbooking.entity.User;
import com.example.busbooking.service.AdminService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {

        this.adminService = adminService;
    }

    // =========================
    // DASHBOARD
    // =========================

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard() {

        return ResponseEntity.ok(
                adminService.getDashboard()
        );
    }

    // =========================
    // BUS MANAGEMENT
    // =========================

    @GetMapping("/buses")
    public ResponseEntity<List<Bus>> getAllBuses() {

        return ResponseEntity.ok(
                adminService.getAllBuses()
        );
    }

    @PostMapping("/buses")
    public ResponseEntity<Bus> addBus(
            @RequestBody Bus bus) {

        return ResponseEntity.ok(
                adminService.addBus(bus)
        );
    }

    @PutMapping("/buses/{id}")
    public ResponseEntity<Bus> updateBus(
            @PathVariable Long id,
            @RequestBody Bus bus) {

        return ResponseEntity.ok(
                adminService.updateBus(id, bus)
        );
    }

    @DeleteMapping("/buses/{id}")
    public ResponseEntity<String> deleteBus(
            @PathVariable Long id) {

        adminService.deleteBus(id);

        return ResponseEntity.ok(
                "Bus deleted successfully"
        );
    }

    // =========================
    // USER MANAGEMENT
    // =========================

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                adminService.getAllUsers()
        );
    }

    // =========================
    // BOOKING MANAGEMENT
    // =========================

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {

        return ResponseEntity.ok(
                adminService.getAllBookings()
        );
    }

    @PutMapping("/bookings/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                adminService.cancelBooking(id)
        );
    }
}