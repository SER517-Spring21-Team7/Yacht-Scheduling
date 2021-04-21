package tys.tysWebserver.watercraftManager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.watercraftManager.model.WatercraftModel;

@Repository
public interface AddWatercraftRepo extends JpaRepository<WatercraftModel, Integer> {
	
	@Query("Select wc from WatercraftModel wc where wc.watercraftId in (?1)")
	List<WatercraftModel> findWaterCraftsByMemberId(List<Integer> ids);
	
	

}
