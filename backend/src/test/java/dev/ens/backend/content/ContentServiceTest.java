package dev.ens.backend.content;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import dev.ens.backend.model.Content;
import dev.ens.backend.model.ContentItem;

import java.util.Arrays;
import java.util.List;

class ContentServiceTest {

    ContentRepository contentRepository = mock(ContentRepository.class);
    ContentService contentService = new ContentService(contentRepository);

    @Test
    void getContent_shouldReturnEmptyList_whenCalledInitially() {
        // GIVEN
        List<Content> expected = List.of();
        when(contentRepository.findAll()).thenReturn(List.of());

        // WHEN
        List<Content> actual = contentService.getContent();

        // THEN
        assertEquals(expected, actual);
        verify(contentRepository).findAll();
    }

    @Test
    void getContent_shouldReturnListOfContent_whenCalled() {
        // GIVEN
        ContentItem contentItem1 = new ContentItem("type1", "data1");
        ContentItem contentItem2 = new ContentItem("type2", "data2");
        List<Content> expected = List.of(new Content("1", Arrays.asList(contentItem1, contentItem2)));
        when(contentRepository.findAll()).thenReturn(expected);

        // WHEN
        List<Content> actual = contentService.getContent();

        // THEN
        assertEquals(expected, actual);
        verify(contentRepository).findAll();
    }
}