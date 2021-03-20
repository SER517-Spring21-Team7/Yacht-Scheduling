package tys.tysWebserver.scheduler.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import tys.tysWebserver.memberManager.model.MemberModel;
import tys.tysWebserver.scheduler.model.WatercraftScheduler;

@Repository
public interface WatercraftSchedulerRepository extends JpaRepository<WatercraftScheduler, Integer>, WatercraftSchedulerRepositoryCustom {
	
	@Transactional
	List<WatercraftScheduler> findByWatercraftid(int watercraftid);

}
