package com.example.covid.spring.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class HospitalDto {
	private long id;
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
	private AddressDto address;
	private List<PatientDto> patients;
	private List<DiseaseDto> diseases;
}
