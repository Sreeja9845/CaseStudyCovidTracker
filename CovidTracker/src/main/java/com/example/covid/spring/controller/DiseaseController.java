package com.example.covid.spring.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.covid.spring.dto.DiseaseDto;
import com.example.covid.spring.model.DiseaseModel;
import com.example.covid.spring.service.DiseaseService;

@RestController
@CrossOrigin
@RequestMapping("/api/disease")
public class DiseaseController {
	
	private static final Logger logger = LoggerFactory.getLogger(DiseaseController.class);
	
	@Autowired
	DiseaseService diseaseService;
	
	@PostMapping
	public ResponseEntity<DiseaseDto> addDisease(@RequestBody final DiseaseModel diseaseModel){
		logger.info("Add disease controller triggered");
		final DiseaseDto disease = diseaseService.addDisease(diseaseModel);
		logger.info("Add disease controller completed");
		return new ResponseEntity<>(disease, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<DiseaseDto>> getAllDiseases(){
		logger.info("Get all diseases controller triggered");
		final List<DiseaseDto> disease = diseaseService.getAllDiseases();
		logger.info("Get all diseases controller completed");
		return new ResponseEntity<>(disease, HttpStatus.OK);
	}
	
	@DeleteMapping("/{diseaseId}/{userId}")
	public ResponseEntity<String> deleteDiseaseById(@PathVariable long diseaseId, @PathVariable long userId){
		logger.info("Delete disease controller triggered - diseaseId : {} and userId : {}", diseaseId, userId);
		diseaseService.deleteDiseaseById(diseaseId, userId);
		logger.info("Delete disease controller - completed");
		return new ResponseEntity<>("Disease deleted successfully", HttpStatus.OK);
	}
	
	@PutMapping("/{diseaseId}")
	public ResponseEntity<DiseaseDto> updateDiseaseById(@PathVariable long diseaseId, @RequestBody final DiseaseModel diseaseModel){
		logger.info("Update disease controller triggered - diseaseId : {}", diseaseId);
		DiseaseDto disease = diseaseService.updateDiseaseById(diseaseId, diseaseModel);
		logger.info("Update disease controller completed - diseaseId : {}", diseaseId);
		return new ResponseEntity<>(disease, HttpStatus.OK);
	}
}
