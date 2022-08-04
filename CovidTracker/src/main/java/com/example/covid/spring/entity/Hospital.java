package com.example.covid.spring.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Hospital {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name="hospital_name", unique = true)
	private String hospitalName;
	private String hospitalType;
	private int freeBeds;
	private String zoneType;
    private int icuBeds;
    private int generalBeds;
    private long addedBy;
    private long modifiedBy;
    private Date addedAt;
    private Date modifiedAt;
	
	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "addressId")
	private Address address;

	@JsonIgnore
	@OneToMany(mappedBy = "hospital", orphanRemoval = true, targetEntity = Patient.class, cascade = CascadeType.ALL)
	private List<Patient> patients;
	
	@JsonIgnore
	@ManyToMany(targetEntity = Disease.class, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
	@JoinTable(name="hospital_disease_map", 
			joinColumns = {
					@JoinColumn(name = "hospitalId", referencedColumnName = "id")}, inverseJoinColumns = {
					@JoinColumn(name = "diseaseId", referencedColumnName = "id")
			})
	private List<Disease> diseases;

}
