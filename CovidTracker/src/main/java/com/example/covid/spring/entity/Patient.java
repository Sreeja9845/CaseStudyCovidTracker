package com.example.covid.spring.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Patient {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String patientName;
	private String patientStatus;
	private String labTest;
	//private boolean isConfirmed;
	private int patientAge;
	private long addedBy;
    private long modifiedBy;
    private Date addedAt;
    private Date modifiedAt;
    
	@OneToOne(cascade = CascadeType.ALL)
	private Address address;
	
	@OneToOne(cascade = CascadeType.ALL)
	private Disease disease;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="hospital_id")
	private Hospital hospital;
	
	

	/*
	 * @JsonIgnore
	 * 
	 * @ManyToMany(mappedBy="patient") private List<Hospital> hospital;
	 * 
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "addrId") private Address address;
	 * 
	 * @ManyToMany(cascade=
	 * {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH})
	 * 
	 * @JoinTable( name="patient_disease", joinColumns= {@JoinColumn (name
	 * ="patient_id") }, inverseJoinColumns= {@JoinColumn(name="disease_id")})
	 * private Disease disease;
	 */
	// @ManyToOne(cascade=
	// {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH})
	// @JoinColumn(name = "diseaseId", nullable = false)
	// private Disease disease;


}
