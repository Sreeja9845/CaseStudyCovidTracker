package com.example.covid.spring.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DiseaseModel {
	private int userId;
	private String name;
	private String varient;
	private String virusName;
	
}
