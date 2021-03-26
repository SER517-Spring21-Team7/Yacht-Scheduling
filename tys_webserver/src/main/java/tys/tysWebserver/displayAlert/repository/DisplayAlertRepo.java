package tys.tysWebserver.displayAlert.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import tys.tysWebserver.displayAlert.model.DisplayAlertModel;

@Repository
public interface DisplayAlertRepo extends JpaRepository<DisplayAlertModel, Integer> {

}
