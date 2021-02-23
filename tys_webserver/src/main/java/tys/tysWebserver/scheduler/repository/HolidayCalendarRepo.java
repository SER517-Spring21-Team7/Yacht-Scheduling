package tys.tysWebserver.scheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tys.tysWebserver.scheduler.model.HolidayCalendar;

@Repository
public interface HolidayCalendarRepo extends JpaRepository<HolidayCalendar, Integer> {

}
