package dev.ens.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;


public record Goal(
        String goalId,
        String goalName,
        int goalPrice,
        Instant createAt,
        boolean isCompleted
) {
}
