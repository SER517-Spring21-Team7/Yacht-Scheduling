package tys.tysWebserver.checkList.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import tys.tysWebserver.checkList.model.CheckListModel;

@Repository
public interface CheckListRepo  extends JpaRepository<CheckListModel, Integer> {
	
	@Transactional
	List<CheckListModel> findByWatercraftId(int watercraftId);
}
