package tys.tysWebserver.accountManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.accountManager.model.UserProfile;

@Repository
public interface UserProfileRepo extends JpaRepository<UserProfile, Integer> {

}
