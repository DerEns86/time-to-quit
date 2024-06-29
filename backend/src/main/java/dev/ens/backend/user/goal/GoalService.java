package dev.ens.backend.user.goal;

import dev.ens.backend.exceptions.NoSuchUserException;
import dev.ens.backend.model.AppUser;
import dev.ens.backend.model.Goal;
import dev.ens.backend.model.GoalDTO;
import dev.ens.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoalService {
    private final UserRepository userRepository;
    private final IdService idService;

    public AppUser addGoal(String userId, Goal goal) {
        AppUser user = userRepository.findById(userId).orElseThrow();
        String newGoalId = idService.generateId();

        Goal newGoal = new Goal(
                newGoalId,
                goal.goalName(),
                goal.goalPrice(),
                Instant.now(),
                false
        );
        user.goals().add(newGoal);
        return userRepository.save(user);
    }

    public AppUser updateGoal(String userId, String goalId, GoalDTO goalDTO){
        AppUser user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchUserException("No user found with id: " + userId));

        Optional<Goal> goalToUpdate = user.goals().stream()
                .filter(goal -> goal.goalId().equals(goalId))
                .findFirst();

        if(goalToUpdate.isPresent()){
            Goal updatedGoal = new Goal(
                    goalToUpdate.get().goalId(),
                    goalDTO.goalName(),
                    goalDTO.goalPrice(),
                    goalToUpdate.get().createAt(),
                    goalToUpdate.get().isCompleted()
            );
            user.goals().removeIf(goal -> goal.goalId().equals(goalId));
            user.goals().add(updatedGoal);
            return userRepository.save(user);
        } else {
            throw new NoSuchUserException("No goal found with id: " + goalId);
        }
    }
}
