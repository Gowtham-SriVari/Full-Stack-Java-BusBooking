package com.example.busbooking.service;

import org.springframework.stereotype.Service;

import com.example.busbooking.entity.Booking;
import com.example.busbooking.entity.Bus;
import com.example.busbooking.entity.User;
import com.example.busbooking.repository.BookingRepository;
import com.example.busbooking.repository.BusRepository;
import com.example.busbooking.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BusRepository busRepository;

    public BookingService(BookingRepository bookingRepository,
            UserRepository userRepository, BusRepository busRepository) {

        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.busRepository = busRepository;
    }

    public Booking createBooking(Long userId, Long busId,
            String passengerName, List<Integer> seatNumbers) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        if (seatNumbers == null || seatNumbers.isEmpty()) {
            throw new RuntimeException("Please select at least one seat");
        }

        // to check seat no:
        for (Integer seatNumber : seatNumbers) {

            if (seatNumber < 1 || seatNumber > bus.getTotalSeats()) {

                throw new RuntimeException("Invalid seat number: " + seatNumber);
            }
        }

        // to check duplicate seats inside the same request
        if (seatNumbers.size() != seatNumbers.stream().distinct().count()) {

            throw new RuntimeException("Duplicate seat selected");
        }

        // to check whether seats are already booked
        List<Booking> busBookings = bookingRepository.findByBusId(busId);

        for (Booking booking : busBookings) {

            if (!"BOOKED".equals(booking.getStatus())) {
                continue;
            }

            for (Integer bookedSeat : booking.getSeatNumbers()) {

                if (seatNumbers.contains(bookedSeat)) {

                    throw new RuntimeException("Seat " + bookedSeat + " is already booked");
                }
            }
        }

        Booking booking = new Booking();

        booking.setUser(user);
        booking.setBus(bus);
        booking.setPassengerName(passengerName);
        booking.setSeatNumbers(seatNumbers);

        // imp:calculation
        // Bus price × number of seats
        double totalAmount = bus.getPrice() * seatNumbers.size();

        booking.setAmount(totalAmount);

        booking.setStatus("BOOKED");
        booking.setBookingDate(LocalDateTime.now());

        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {

        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();
    }

    public Booking cancelBooking(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                        .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("CANCELLED");

        return bookingRepository.save(booking);
    }
}