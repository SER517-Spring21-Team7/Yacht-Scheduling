package tys.tysWebserver.displayAlert.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.displayAlert.model.DisplayAlertModel;

@Repository
public interface DisplayAlertRepo extends JpaRepository<DisplayAlertModel, Integer> {

}
