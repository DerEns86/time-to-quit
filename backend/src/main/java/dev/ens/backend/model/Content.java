package dev.ens.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "quitting_content")
public record Content(
        @Id String id,
        List<ContentItem> content
) {
}

