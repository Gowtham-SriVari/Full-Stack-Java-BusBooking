package com.example.busbooking.service;

import org.springframework.stereotype.Service;

import com.example.busbooking.entity.Bus;
import com.example.busbooking.repository.BusRepository;

import java.util.List;

@Service
public class BusService {

    private final BusRepository busRepository;

    public BusService(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    public Bus getBusById(Long id) {
        return busRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bus not found"));
    }

    public List<Bus> searchBuses(String source, String destination) {
        return busRepository
                .findBySourceIgnoreCaseAndDestinationIgnoreCase(source, destination);
    }

    public Bus addBus(Bus bus) {
        return busRepository.save(bus);
    }

    public Bus updateBus(Long id, Bus busDetails) {

        Bus bus = getBusById(id);

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
        busRepository.deleteById(id);
    }
}
