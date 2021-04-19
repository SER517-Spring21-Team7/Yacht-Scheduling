package tys.tysWebserver.checkList.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.checkList.model.CheckListModel;

@Repository
public interface CheckListRepo  extends JpaRepository<CheckListModel, Integer> {

}
