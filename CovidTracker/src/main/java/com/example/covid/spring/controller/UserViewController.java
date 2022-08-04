package com.example.covid.spring.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.covid.spring.dto.OverallPatientHistoryDto;
import com.example.covid.spring.entity.User;
import com.example.covid.spring.service.PatientService;

@RestController
@CrossOrigin
@RequestMapping("/api/view")
public class UserViewController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserViewController.class);
	
	@Autowired
	PatientService patientService;
	
	@GetMapping
	public ResponseEntity<OverallPatientHistoryDto> getAllPatientsHistory(){
		logger.info("get All Patients History triggered");
		final OverallPatientHistoryDto history = patientService.getOverallPatientHistory();
		return new ResponseEntity<>(history, HttpStatus.OK);
	}
}
