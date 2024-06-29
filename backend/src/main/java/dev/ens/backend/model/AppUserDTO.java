package dev.ens.backend.model;

import java.time.Instant;
import java.util.List;

public record AppUserDTO(
        int dailySmokedCigarettes,
        List<String> mainMotivation,
        Instant quitDate,
        List<Goal> goals
) {
}
