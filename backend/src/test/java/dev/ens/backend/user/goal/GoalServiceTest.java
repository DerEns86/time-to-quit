package dev.ens.backend.user.goal;

import dev.ens.backend.exceptions.NoSuchUserException;
import dev.ens.backend.model.Goal;
import dev.ens.backend.model.GoalDTO;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AppUserServiceTest {

    GoalRepository goalRepository = mock(GoalRepository.class);
    GoalService goalService = new GoalService(goalRepository);



    @Test
    void addGoal_shouldReturnUserWithNewGoal_whenCalledWithValidUserIdAndGoal() {
        // GIVEN

        Goal goal = new Goal(
                null,
                "new goal",
                100,
                false,
                "1");

        when(goalRepository.save(any(Goal.class))).thenReturn(goal);

        // WHEN
        Goal actual = goalService.addGoal("1", goal);

        // THEN
        assertEquals("new goal", actual.goalName());
        assertEquals(100, actual.goalPrice());
        assertFalse(actual.isCompleted());
        verify(goalRepository).save(goal);
    }

    @Test
    void updateGoal_shouldReturnUpdatedGoal_whenCalledWithValidGoalIdAndGoalDTO() {
        // GIVEN
        Goal existingGoal = new Goal(
                "goalId",
                "existing goal",
                50,
                false,
                "1");

        GoalDTO goalDTO = new GoalDTO(
                "updated goal",
                150,
                false,
                "1");

        Goal updatedGoal = new Goal(
                "goalId",
                "updated goal",
                150,
                false,
                "1");

        when(goalRepository.findById("goalId")).thenReturn(Optional.of(existingGoal));
        when(goalRepository.save(any(Goal.class))).thenReturn(updatedGoal);

        // WHEN
        Goal actual = goalService.updateGoal("goalId", goalDTO);

        // THEN
        assertEquals(updatedGoal, actual);
        verify(goalRepository).findById("goalId");
        verify(goalRepository).save(any(Goal.class));
    }



    @Test
    void updateGoal_shouldThrowNoSuchUserException_whenGoalDoesNotExist() {
        // GIVEN
        GoalDTO goalDTO = new GoalDTO(
                "updated goal",
                150,
                false,
                "1"); // Assuming "1" is the userId

        when(goalRepository.findById("goalId")).thenReturn(Optional.empty());

        // WHEN
        Exception exception = assertThrows(NoSuchUserException.class, () -> goalService.updateGoal("goalId", goalDTO));

        // THEN
        assertEquals("No goal found with id: goalId", exception.getMessage());
        verify(goalRepository).findById("goalId");
    }
}