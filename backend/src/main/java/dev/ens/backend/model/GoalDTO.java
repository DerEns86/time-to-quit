package dev.ens.backend.model;

import lombok.With;

@With
public record GoalDTO(
        String goalName,
        int goalPrice,
        boolean isCompleted,
        String appUserId
 ) {
}
