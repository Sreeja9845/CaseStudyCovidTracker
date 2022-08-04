package com.example.covid.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressDto {
	private long id;
	private String street;
	private String city;
	private String state;
}
