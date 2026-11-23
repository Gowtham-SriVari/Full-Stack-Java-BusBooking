package com.example.busbooking.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.busbooking.entity.Bus;
import com.example.busbooking.service.BusService;

import java.util.List;

@RestController
@RequestMapping("/api/buses")
@CrossOrigin(origins = "http://localhost:5173")
public class BusController {

    private final BusService busService;

    public BusController(BusService busService) {
        this.busService = busService;
    }

    @GetMapping
    public List<Bus> getAllBuses() {
        return busService.getAllBuses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bus> getBus(@PathVariable Long id) {
        return ResponseEntity.ok(busService.getBusById(id));
    }

    @GetMapping("/search")
    public List<Bus> searchBuses(@RequestParam String source,
            @RequestParam String destination) {

        return busService.searchBuses(source, destination);
    }

    @PostMapping
    public ResponseEntity<Bus> addBus(@RequestBody Bus bus) {
        return ResponseEntity.ok(busService.addBus(bus));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bus> updateBus(@PathVariable Long id,
            @RequestBody Bus bus) {

        return ResponseEntity.ok(
                busService.updateBus(id, bus)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBus(@PathVariable Long id) {

        busService.deleteBus(id);

        return ResponseEntity.ok("Bus deleted successfully");
    }
}
