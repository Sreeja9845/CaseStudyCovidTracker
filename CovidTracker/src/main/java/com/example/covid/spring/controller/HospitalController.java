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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.covid.spring.dto.HospitalDto;
import com.example.covid.spring.model.HospitalModel;
import com.example.covid.spring.model.HospitalUpdateModel;
import com.example.covid.spring.service.HospitalService;

@RestController
@CrossOrigin
@RequestMapping("/api/hospital")
public class HospitalController {
	
	private static final Logger logger = LoggerFactory.getLogger(HospitalController.class);
	
	@Autowired
	HospitalService hospitalService;
	
	@PostMapping
	public ResponseEntity<HospitalDto> addHospital(@RequestBody final HospitalModel hospitalModel){
		logger.info("Add hospital controller triggered - Name : {}", hospitalModel.getHospitalName());
		final HospitalDto hospital = hospitalService.addHospital(hospitalModel);
		logger.info("Add hospital controller completed - Name : {}", hospitalModel.getHospitalName());
		return new ResponseEntity<>(hospital, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{hospitalId}/{userId}")
	public ResponseEntity<String> deleteHospitalById(@PathVariable long hospitalId, @PathVariable long userId){
		logger.info("Delete hospital controller triggered - hospitalId : {}, userId : {}", hospitalId,userId );
		hospitalService.deleteHospitalById(hospitalId, userId);
		logger.info("Delete hospital controller completed");
		return new ResponseEntity<>("Hospital deleted successfully", HttpStatus.OK);
	}
	
	@PutMapping("/{hospitalId}/{userId}")
	public ResponseEntity<HospitalDto> updateHospitalById(@PathVariable long hospitalId, @PathVariable long userId, @RequestBody HospitalUpdateModel model){
		logger.info("Update hospital controller triggered - hospitalId : {}, userId : {}", hospitalId, userId );
		HospitalDto hospital = hospitalService.updateHospitalById(hospitalId, userId, model);
		logger.info("Update hospital controller completed - hospitalId : {}, userId : {}", hospitalId, userId );
		return new ResponseEntity<>(hospital, HttpStatus.OK);
	}
	
	@GetMapping("/{hospitalId}")
	public ResponseEntity<HospitalDto> getHospitalById(@PathVariable long hospitalId){
		logger.info("Get hospital by Id controller triggered - hospitalId : {}",hospitalId);
		HospitalDto hospitals = hospitalService.getHospitalById(hospitalId);
		logger.info("Get hospital by Id controller completed - Matched Hospitals size : {}", hospitals);
		return new ResponseEntity<>(hospitals, HttpStatus.OK);
	}
	
	@GetMapping("")
	public ResponseEntity<List<HospitalDto>> getAllHospitals(
			@RequestParam(name = "zone", defaultValue = "") String zone,
			@RequestParam(name = "type", defaultValue = "") String type,
			@RequestParam(name = "freebeds", defaultValue = "false") boolean freebedsAvailability,
			@RequestParam(name = "generalBeds", defaultValue = "false") boolean generalBedsAvailability,
			@RequestParam(name = "icuBeds", defaultValue = "false") boolean icuBedsAvailability){
		logger.info("Get all hospital controller triggered - zone : {}, type : {}, freebedsAvailability: {}, generalBedsAvailability: {}, icuBedsAvailability:{}",
				zone, type, freebedsAvailability,generalBedsAvailability, icuBedsAvailability);
		List<HospitalDto> hospitals = hospitalService.getAllHospitals(zone, type, freebedsAvailability, generalBedsAvailability, icuBedsAvailability);
		logger.info("Get all hospital controller completed - Matched Hospitals size : {}", hospitals.size());
		return new ResponseEntity<>(hospitals, HttpStatus.OK);
	}
}
