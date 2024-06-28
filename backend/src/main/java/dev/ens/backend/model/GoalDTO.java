package dev.ens.backend.model;

import lombok.With;

import java.time.Instant;

@With
public record GoalDTO(
        String goalName,
        int goalPrice,
        Instant createAt,
        boolean isCompleted
 ) {
}