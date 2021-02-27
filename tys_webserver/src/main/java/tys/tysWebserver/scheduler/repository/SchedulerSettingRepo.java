package tys.tysWebserver.scheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.scheduler.model.SchedulerSetting;

@Repository
public interface SchedulerSettingRepo extends JpaRepository<SchedulerSetting, Integer> {

}
