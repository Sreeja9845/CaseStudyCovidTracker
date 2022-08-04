package com.example.covid.spring.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.covid.spring.dto.UserDto;
import com.example.covid.spring.entity.User;
import com.example.covid.spring.service.UserService;
@RestController
@CrossOrigin
public class RegistrationController {
	
	private static final Logger logger = LoggerFactory.getLogger(RegistrationController.class);
	
	@Autowired
	UserService userService;
	
	@PostMapping(path = "/api/register")
	public ResponseEntity<UserDto> createUser(@RequestBody final User userPayload){
		logger.info("create user triggered : {}", userPayload.getEmail());
		final UserDto user = userService.register(userPayload);
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}
}
