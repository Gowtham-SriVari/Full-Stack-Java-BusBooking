package com.example.busbooking.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.busbooking.entity.Booking;
import com.example.busbooking.service.BookingService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody Map<String, Object> data) {

        try {

            Long userId = Long.valueOf(
                    data.get("userId").toString()
            );

            Long busId = Long.valueOf(
                    data.get("busId").toString()
            );

            String passengerName =
                    data.get("passengerName").toString();

            List<Integer> seatNumbers =
                    ((List<?>) data.get("seatNumbers"))
                            .stream()
                            .map(value ->
                                    Integer.parseInt(
                                            value.toString()))
                            .toList();

            Booking booking =
                    bookingService.createBooking(
                            userId,
                            busId,
                            passengerName,
                            seatNumbers
                    );

            return ResponseEntity.ok(booking);

        } catch (RuntimeException e) {

            return ResponseEntity.badRequest()
                    .body(Map.of(
                            "message",
                            e.getMessage()
                    ));
        }
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(
            @PathVariable Long userId) {

        return bookingService.getUserBookings(userId);
    }

    @GetMapping
    public List<Booking> getAllBookings() {

        return bookingService.getAllBookings();
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                bookingService.cancelBooking(id)
        );
    }
}