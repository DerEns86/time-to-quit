package dev.ens.backend.user.goal;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class IdServiceTest {

    @Test
    void generateId() {
        IdService idService = new IdService();
        String id = idService.generateId();
        assertNotNull(id);
        assertEquals(36, id.length());
    }
}