package tys.tysWebserver.watercraftManager.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "watercraftdetails")
public class WatercraftModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "watercraftid")
	private int watercraftId;
	@Column(name = "watercraftname")
	private String watercraftName;
	@Column(name = "makeyear")
	private int makeYear;
	@Column(name = "description")
	private String description;
	@Column(name = "builder")
	private String builder;
	@Column(name = "hulltype")
	private String hullType;
	@Column(name = "length")
	private Float length;
	@Column(name = "category")
	private String category;
	@Column(name = "model")
	private String model;
	@Column(name = "fueltype")
	private String fuelType;
	@Column(name = "boatclass")
	private String boatClass;
	@Column (name = "watercraftimage")
	private String image;

	public String getBoatClass() {
		return boatClass;
	}
	public void setBoatClass(String boatClass) {
		this.boatClass = boatClass;
	}
	@Override
	public String toString() {
		return "watercraftdetails [watercraftid=" + watercraftId + ", watercraftname=" +watercraftName + ", makeyear="
				+ makeYear + ", description=" + description + ", builder="
				+ builder + ", hulltype=" + hullType
				+ ", length=" + length + ", category=" + category + ", model="
				+ model + ", fuelType=" + fuelType + "]";
	}
	public WatercraftModel() {
		super();
	}
	public WatercraftModel(int watercraftId, String watercraftName, int makeYear, String description, String builder,
			String hullType, Float length, String category, String model, String fuelType, String image) {
		super();
		this.watercraftId = watercraftId;
		this.watercraftName = watercraftName;
		this.makeYear = makeYear;
		this.description = description;
		this.builder = builder;
		this.hullType = hullType;
		this.length = length;
		this.category = category;
		this.model = model;
		this.fuelType = fuelType;
		this.image = image;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public int getWatercraftId() {
		return watercraftId;
	}
	public void setWatercraftId(int watercraftId) {
		this.watercraftId = watercraftId;
	}
	public String getWatercraftName() {
		return watercraftName;
	}
	public void setWatercraftName(String watercraftName) {
		this.watercraftName = watercraftName;
	}
	public int getMakeYear() {
		return makeYear;
	}
	public void setMakeYear(int makeYear) {
		this.makeYear = makeYear;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getBuilder() {
		return builder;
	}
	public void setBuilder(String builder) {
		this.builder = builder;
	}
	public String getHullType() {
		return hullType;
	}
	public void setHullType(String hullType) {
		this.hullType = hullType;
	}
	public Float getLength() {
		return length;
	}
	public void setLength(Float length) {
		this.length = length;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getFuelType() {
		return fuelType;
	}
	public void setFuelType(String fuelType) {
		this.fuelType = fuelType;
	}
	
}

