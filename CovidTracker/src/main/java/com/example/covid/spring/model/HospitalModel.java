package com.example.covid.spring.model;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HospitalModel {
	private int userId;
	private String hospitalName;
	private String hospitalType;
	private int freeBeds;
	private int generalBeds;
	private int icuBeds;
	private String zone;
	private String street;
	private String city;
	private String state;
    private List<Integer> diseaseList;

	
}
