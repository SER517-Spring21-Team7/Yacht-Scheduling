package tys.tysWebserver.displayAlert.repository;


import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.displayAlert.model.DisplayAlertModel;

@Repository
public interface DisplayAlertRepo extends JpaRepository<DisplayAlertModel, Integer> {

	
	@Query("Select da from DisplayAlertModel da where da.watercraftId in (?1)")
	public List<DisplayAlertModel> getDisplayAlertsForMember(Set<Integer> watercraftList);
}
