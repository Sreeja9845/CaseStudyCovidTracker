package com.example.covid.spring.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PatientUpdateModel {
	private String status;
	private String labTest;
}
