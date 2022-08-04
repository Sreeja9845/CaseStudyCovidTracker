package com.example.covid.spring.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.covid.spring.dto.PatientDto;
import com.example.covid.spring.model.PatientModel;
import com.example.covid.spring.model.PatientUpdateModel;
import com.example.covid.spring.service.PatientService;

@RestController
@CrossOrigin
@RequestMapping("/api/patient")
public class PatientController {
	
	private static final Logger logger = LoggerFactory.getLogger(PatientController.class);
	
	@Autowired
	PatientService patientService;
	
	@PostMapping
	public ResponseEntity<PatientDto> addPatient(@RequestBody final PatientModel patientModel){
		logger.info("Add patient controller triggered");
		final PatientDto patient = patientService.addPatient(patientModel);
		logger.info("Add patient controller completed");
		return new ResponseEntity<>(patient, HttpStatus.CREATED);
	}
	
	@PutMapping("/{patientId}/{userId}")
	public ResponseEntity<PatientDto> updatePatient(@PathVariable long patientId, @PathVariable long userId, @RequestBody PatientUpdateModel model){
		logger.info("Add patient controller triggered");
		final PatientDto patient = patientService.updatePatient(patientId, userId, model);
		logger.info("Add patient controller completed");
		return new ResponseEntity<>(patient, HttpStatus.CREATED);
	}
}
