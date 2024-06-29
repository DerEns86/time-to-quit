package dev.ens.backend.user.goal;

import dev.ens.backend.model.Goal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalRepository extends MongoRepository<Goal, String>{
    List<Goal> findByAppUserId(String appUserId);
}
