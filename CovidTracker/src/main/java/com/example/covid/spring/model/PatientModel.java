package com.example.covid.spring.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PatientModel {
	private int userId;
	private String name;
	private int age;
	private String status;
	private String labTest;
	private long diseaseId;
	private long hospitalId;
	private String street;
	private String city;
	private String state;
	
}
