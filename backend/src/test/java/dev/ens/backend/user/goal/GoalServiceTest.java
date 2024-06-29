package dev.ens.backend.user.goal;

import dev.ens.backend.exceptions.NoSuchUserException;
import dev.ens.backend.model.AppUser;
import dev.ens.backend.model.Goal;
import dev.ens.backend.model.GoalDTO;
import dev.ens.backend.user.UserRepository;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AppUserServiceTest {

    UserRepository userRepository = mock(UserRepository.class);
    IdService idService = mock(IdService.class);
    GoalService goalService = new GoalService(userRepository, idService);

    @Test
    void addGoal_shouldReturnUserWithNewGoal_whenCalledWithValidUserIdAndGoal() {
        // GIVEN
        Instant fixedInstant = Instant.parse("2024-06-20T10:15:30.00Z");
        AppUser user = new AppUser(
                "1",
                "123",
                "avatar_url",
                "username",
                2,
                List.of("test1", "test2")
                , fixedInstant,
                new ArrayList<>());

        Goal goal = new Goal(
                null,
                "new goal",
                100,
                null,
                false);

        String newGoalId = "newGoalId";

        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        when(idService.generateId()).thenReturn(newGoalId);
        when(userRepository.save(any(AppUser.class))).thenReturn(user);

        // WHEN
        AppUser actual = goalService.addGoal("1", goal);

        // THEN
        assertEquals(newGoalId, actual.goals().get(0).goalId());
        assertEquals("new goal", actual.goals().get(0).goalName());
        assertEquals(100, actual.goals().get(0).goalPrice());
        assertFalse(actual.goals().get(0).isCompleted());
        verify(userRepository).findById("1");
        verify(idService).generateId();
        verify(userRepository).save(user);
    }

    @Test
    void updateGoal_shouldReturnUpdatedUser_whenCalledWithValidUserIdAndGoalDTO() {
        // GIVEN
        Instant fixedInstant = Instant.parse("2024-06-20T10:15:30.00Z");
        Goal existingGoal = new Goal(
                "goalId",
                "existing goal",
                50, fixedInstant,
                false);

        AppUser user = new AppUser(
                "1",
                "123",
                "avatar_url",
                "username",
                2,
                List.of("test1", "test2"),
                fixedInstant,
                new ArrayList<>(List.of(existingGoal)));

        GoalDTO goalDTO = new GoalDTO(
                "updated goal",
                150,
                fixedInstant,
                false);

        Goal updatedGoal = new Goal(
                "goalId",
                "updated goal",
                150,
                fixedInstant,
                false);
        AppUser expectedUser = new AppUser(
                "1",
                "123",
                "avatar_url",
                "username",
                2,
                List.of("test1", "test2"),
                fixedInstant,
                new ArrayList<>(List.of(updatedGoal)));

        when(userRepository.findById("1")).thenReturn(Optional.of(user));
        when(userRepository.save(any(AppUser.class))).thenReturn(expectedUser);

        // WHEN
        AppUser actual = goalService.updateGoal(
                "1",
                "goalId",
                goalDTO);

        // THEN
        assertEquals(expectedUser, actual);
        verify(userRepository).findById("1");
        verify(userRepository).save(user);
    }

    @Test
    void updateGoal_shouldThrowNoSuchUserException_whenUserDoesNotExist() {
        // GIVEN
        GoalDTO goalDTO = new GoalDTO(
                "updated goal",
                150, Instant.now(),
                false);
        when(userRepository.findById("1")).thenReturn(Optional.empty());

        // WHEN
        Exception exception = assertThrows(NoSuchUserException.class, () -> goalService.updateGoal("1", "goalId", goalDTO));

        // THEN
        assertEquals("No user found with id: 1", exception.getMessage());
        verify(userRepository).findById("1");
    }

    @Test
    void updateGoal_shouldThrowNoSuchUserException_whenGoalDoesNotExist() {
        // GIVEN
        Instant fixedInstant = Instant.parse("2024-06-20T10:15:30.00Z");
        AppUser user = new AppUser("1",
                "123",
                "avatar_url",
                "username",
                2,
                List.of("test1", "test2"),
                fixedInstant, List.of());

        GoalDTO goalDTO = new GoalDTO("updated goal",
                150,
                fixedInstant,
                false);

        when(userRepository.findById("1")).thenReturn(Optional.of(user));

        // WHEN
        Exception exception = assertThrows(NoSuchUserException.class, () -> goalService.updateGoal("1", "goalId", goalDTO));

        // THEN
        assertEquals("No goal found with id: goalId", exception.getMessage());
        verify(userRepository).findById("1");
    }
}