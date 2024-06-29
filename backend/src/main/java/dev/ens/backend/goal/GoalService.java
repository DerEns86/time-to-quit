package dev.ens.backend.goal;

import dev.ens.backend.exceptions.NoSuchGoalException;
import dev.ens.backend.exceptions.NoSuchUserException;
import dev.ens.backend.model.AppUser;
import dev.ens.backend.model.Goal;
import dev.ens.backend.model.GoalDTO;
import dev.ens.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    private AppUser findTestUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchUserException("No user found with id: " + userId));
    }

    public Goal addGoal(String userId, Goal goal) {
       findTestUserById(userId);

        Goal newGoal = new Goal(
                null,
                goal.goalName(),
                goal.goalPrice(),
                false,
                userId
        );
        return goalRepository.save(newGoal);
    }

    public Goal updateGoal(String userId, String goalId, GoalDTO goalDTO){
        findTestUserById(userId);

        Goal goalToUpdate = goalRepository.findById(goalId)
                .orElseThrow(() -> new NoSuchGoalException("No goal found with id: " + goalId));

        Goal updatedGoal = new Goal(
                goalToUpdate.goalId(),
                goalDTO.goalName(),
                goalDTO.goalPrice(),
                goalToUpdate.isCompleted(),
                goalToUpdate.appUserId()
        );

        return goalRepository.save(updatedGoal);
    }

    public List<Goal> getGoals(String userId) {
        return goalRepository.findByAppUserId(userId);
    }

    public void deleteGoal(String userId, String goalId) {
        findTestUserById(userId);

        Goal goalToDelete = goalRepository.findById(goalId)
                .orElseThrow(() -> new NoSuchUserException("No goal found with id: " + goalId));

        goalRepository.delete(goalToDelete);
    }
}
