package dev.ens.backend.model;

import java.time.Instant;

public record Goal(
        String goalId,
        String goalName,
        int goalPrice,
        Instant createAt,
        boolean isCompleted
) {
}
