package dev.ens.backend.content;

import dev.ens.backend.model.Content;
import dev.ens.backend.model.ContentItem;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ContentControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ContentRepository contentRepository;

    @Test
    @DirtiesContext
    void getContent_shouldReturnEmptyList_whenNoContentPresent() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/content"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getContent_shouldReturnListOfContent_whenContentPresent() throws Exception {
        ContentItem contentItem1 = new ContentItem("type1", "data1");
        ContentItem contentItem2 = new ContentItem("type2", "data2");
        Content content = new Content("1", List.of(contentItem1, contentItem2));
        contentRepository.save(content);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/content"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                            "id": "1",
                            "content": [
                                {
                                    "type": "type1",
                                    "data": "data1"
                                },
                                {
                                    "type": "type2",
                                    "data": "data2"
                                }
                            ]
                        }]
                        """));
    }

}