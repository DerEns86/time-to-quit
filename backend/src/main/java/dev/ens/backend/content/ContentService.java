package dev.ens.backend.content;

import dev.ens.backend.model.Content;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentService {

    private final ContentRepository contentRepository;

    public List<Content> getContent() {
        return contentRepository.findAll();
    }


}
