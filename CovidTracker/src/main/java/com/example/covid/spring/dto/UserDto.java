package com.example.covid.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
	private long id;
	private String email;
	private String firstName;
	private String lastName;
	private String mobile;
	private String role;
}
