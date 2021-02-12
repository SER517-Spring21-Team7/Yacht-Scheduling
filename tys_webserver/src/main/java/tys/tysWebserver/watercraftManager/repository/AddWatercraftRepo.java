package tys.tysWebserver.watercraftManager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.watercraftManager.model.WatercraftModel;

@Repository
public interface AddWatercraftRepo extends JpaRepository<WatercraftModel, Integer> {

}
