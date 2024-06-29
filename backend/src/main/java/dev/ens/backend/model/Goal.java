package dev.ens.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.time.Instant;

@With
public record Goal(
        @Id
        String goalId,
        String goalName,
        int goalPrice,
        boolean isCompleted,
        String appUserId
) {
}
