package co.za.backend.enums;

public enum DeliveryStatus {
    PENDING,       // Order created, but not yet handed to the courier
    DISPATCHED,    // Handed over to the courier/in transit to the first hub
    IN_TRANSIT,    // Moving between hubs or out for delivery
    OUT_FOR_DELIVERY, // The "last mile" - currently on the truck to the user
    DELIVERED,     // Successfully dropped off
    FAILED_ATTEMPT,// Courier tried to deliver but couldn't (e.g., no one home)
    DELAYED,       // Stuck due to weather, logistics, or customs
    RETURNED,      // Sent back to the sender
    LOST           // Package is declared missing
}
