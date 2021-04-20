package tys.tysWebserver.checkList.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "checkList")
public class CheckListModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	
	@Column(name = "checkListName")
	private String checkListName;
	
	@Column(name = "publish")
	private boolean publish;
	
	@Column(name = "stage")
	private String stage;
	
	@Column(name = "watercraftId")
	private int watercraftId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCheckListName() {
		return checkListName;
	}

	public void setCheckListName(String checkListName) {
		this.checkListName = checkListName;
	}

	public boolean isPublish() {
		return publish;
	}

	public void setPublish(boolean publish) {
		this.publish = publish;
	}

	public String getStage() {
		return stage;
	}

	public void setStage(String stage) {
		this.stage = stage;
	}

	public int getWatercraftId() {
		return watercraftId;
	}

	public void setWatercraftId(int watercraftId) {
		this.watercraftId = watercraftId;
	}

	@Override
	public String toString() {
		return "CheckListModel [id=" + id + ", checkListName=" + checkListName + ", publish=" + publish + ", stage="
				+ stage + ", watercraftId=" + watercraftId + "]";
	}
}
