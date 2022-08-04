package com.example.covid.spring.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class PatientDto {
	private long id;
	private String patientName;
	private String patientStatus;
	private String labTest;
	private int patientAge;
	private long addedBy;
    private long modifiedBy;
    private Date addedAt;
    private Date modifiedAt;
	private AddressDto address;
	//@JsonIgnore
	private DiseaseDto disease;
	@JsonIgnore
	private HospitalDto hospital;
}
