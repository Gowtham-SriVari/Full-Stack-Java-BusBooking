package com.example.busbooking.service;


import org.springframework.stereotype.Service;

import com.example.busbooking.entity.Booking;
import com.example.busbooking.entity.Bus;
import com.example.busbooking.entity.User;
import com.example.busbooking.repository.BookingRepository;
import com.example.busbooking.repository.BusRepository;
import com.example.busbooking.repository.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    private final BusRepository busRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    public AdminService(
            BusRepository busRepository,
            UserRepository userRepository,
            BookingRepository bookingRepository) {

        this.busRepository = busRepository;
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }

    // =========================
    // DASHBOARD
    // =========================

    public Map<String, Object> getDashboard() {

        long totalUsers = userRepository.count();

        long totalBuses = busRepository.count();

        long totalBookings = bookingRepository.count();

        double totalRevenue = bookingRepository.findAll()
                .stream()
                .filter(booking ->
                        booking.getStatus() != null &&
                        booking.getStatus().equalsIgnoreCase("BOOKED"))
                .mapToDouble(Booking::getAmount)
                .sum();

        Map<String, Object> dashboard = new HashMap<>();

        dashboard.put("totalUsers", totalUsers);
        dashboard.put("totalBuses", totalBuses);
        dashboard.put("totalBookings", totalBookings);
        dashboard.put("totalRevenue", totalRevenue);

        return dashboard;
    }

    // =========================
    // BUS MANAGEMENT
    // =========================

    public List<Bus> getAllBuses() {

        return busRepository.findAll();
    }

    public Bus addBus(Bus bus) {

        return busRepository.save(bus);
    }

    public Bus updateBus(Long id, Bus busDetails) {

        Bus bus = busRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Bus not found"));

        bus.setBusNumber(busDetails.getBusNumber());
        bus.setBusName(busDetails.getBusName());
        bus.setSource(busDetails.getSource());
        bus.setDestination(busDetails.getDestination());
        bus.setDepartureTime(busDetails.getDepartureTime());
        bus.setArrivalTime(busDetails.getArrivalTime());
        bus.setTotalSeats(busDetails.getTotalSeats());
        bus.setPrice(busDetails.getPrice());

        return busRepository.save(bus);
    }

    public void deleteBus(Long id) {

        if (!busRepository.existsById(id)) {

            throw new RuntimeException("Bus not found");
        }

        busRepository.deleteById(id);
    }

    // =========================
    // USER MANAGEMENT
    // =========================

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // =========================
    // BOOKING MANAGEMENT
    // =========================

    public List<Booking> getAllBookings() {

        return bookingRepository.findAll();
    }

    public Booking cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        booking.setStatus("CANCELLED");

        return bookingRepository.save(booking);
    }
}
