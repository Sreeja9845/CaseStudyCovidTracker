package com.example.covid.spring.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HospitalUpdateModel {
	private int freeBeds;
	private int generalBeds;
	private int icuBeds;
}
