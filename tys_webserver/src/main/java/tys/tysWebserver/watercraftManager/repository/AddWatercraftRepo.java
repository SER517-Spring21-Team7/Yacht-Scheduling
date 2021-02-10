package tys.tysWebserver.watercraftManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.watercraftManager.model.AddWatercraftModel;

@Repository
public interface AddWatercraftRepo extends JpaRepository<AddWatercraftModel, Integer> {

}
