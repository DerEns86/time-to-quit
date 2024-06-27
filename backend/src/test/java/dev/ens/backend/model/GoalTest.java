package dev.ens.backend.model;

import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

class GoalTest {

    @Test
    void testGoalConstructorAndGetters() {
        Instant createdAt = Instant.now();
        Goal goal = new Goal("1", "GoalName", 100, createdAt, false);

        assertEquals("1", goal.goalId());
        assertEquals("GoalName", goal.goalName());
        assertEquals(100, goal.goalPrice());
        assertEquals(createdAt, goal.createAt());
        assertEquals(false, goal.isCompleted());
    }

    @Test
    void testGoalEqualsAndHashCode() {
        Instant createdAt = Instant.now();
        Goal goal1 = new Goal("1", "GoalName", 100, createdAt, false);
        Goal goal2 = new Goal("1", "GoalName", 100, createdAt, false);
        Goal goal3 = new Goal("2", "GoalName", 100, createdAt, false);

        assertEquals(goal1, goal2);
        assertEquals(goal1.hashCode(), goal2.hashCode());

        assertNotEquals(goal1, goal3);
        assertNotEquals(goal1.hashCode(), goal3.hashCode());
    }
}