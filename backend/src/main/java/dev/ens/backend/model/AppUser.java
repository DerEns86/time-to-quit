package dev.ens.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "users")
public record AppUser(
        @Id
        String id,
        String githubId,
        String username,
        int dailySmokedCigarettes,
        List<String> mainMotivation,
        Instant quitDate
) {
}
