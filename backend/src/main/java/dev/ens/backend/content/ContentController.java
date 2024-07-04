package dev.ens.backend.content;

import dev.ens.backend.model.Content;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;


    @GetMapping
    public List<Content> getContent(){
        return contentService.getContent();
    }
}
