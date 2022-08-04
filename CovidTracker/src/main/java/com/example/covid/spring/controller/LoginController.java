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
import com.example.covid.spring.model.LoginModel;
import com.example.covid.spring.service.UserService;

@RestController
@CrossOrigin
public class LoginController {
	
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
	UserService userService;
	

	@PostMapping(path = "/api/signin")
	public ResponseEntity<UserDto> loginUser(@RequestBody final LoginModel loginModel){
		logger.info("Sign in user : {}", loginModel.getEmail());
		final UserDto user = userService.loginUser(loginModel);
		logger.info("Sign in user : {}", user.getEmail()!=null);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
}
