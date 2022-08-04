package com.example.covid.spring.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.covid.spring.dto.AddressDto;
import com.example.covid.spring.dto.DiseaseDto;
import com.example.covid.spring.dto.HospitalDto;
import com.example.covid.spring.dto.OverallPatientHistoryDto;
import com.example.covid.spring.dto.PatientDto;
import com.example.covid.spring.entity.Address;
import com.example.covid.spring.entity.Disease;
import com.example.covid.spring.entity.Hospital;
import com.example.covid.spring.entity.Patient;
import com.example.covid.spring.exception.CovidTrackerException;
import com.example.covid.spring.model.PatientModel;
import com.example.covid.spring.model.PatientUpdateModel;
import com.example.covid.spring.repository.DiseaseRepository;
import com.example.covid.spring.repository.HospitalRepository;
import com.example.covid.spring.repository.PatientRepository;
import com.example.covid.spring.service.DiseaseService;
import com.example.covid.spring.service.PatientService;
import com.example.covid.spring.service.UserService;

@Service
public class PatientServiceImpl implements PatientService{
	
	private static final Logger logger = LoggerFactory.getLogger(PatientServiceImpl.class);
	
	@Autowired
	PatientRepository patientRepo;
	
	@Autowired
	HospitalRepository hospitalRepo;
	
	@Autowired
	DiseaseRepository diseaseRepo;
	
	@Autowired
	UserService userService;
	
	@Autowired
	DiseaseService diseaseService;

	@Override
	public PatientDto addPatient(PatientModel patientModel) {
		if(!userService.isAdmin(patientModel.getUserId())) {
			logger.error("User dont have permission to add patient - userId : {}", patientModel.getUserId());
			throw new CovidTrackerException("User dont have permission to add patient");
		}
		logger.info("User has admin access to add patient - userId : {}", patientModel.getUserId());
		Address address = new Address();
		address.setStreet(patientModel.getStreet());
		address.setCity(patientModel.getCity());
		address.setState(patientModel.getState());
		Patient patient = new Patient();
		patient.setAddress(address);
		patient.setPatientName(patientModel.getName());
		patient.setPatientAge(patientModel.getAge());
		patient.setPatientStatus(patientModel.getStatus());
		Optional<Hospital> optional = hospitalRepo.findById(patientModel.getHospitalId());
		if(optional.isPresent()) {
			patient.setHospital(optional.get());
		}
		Optional<Disease> disease = diseaseRepo.findById(patientModel.getDiseaseId());
		if(disease.isPresent()) {
			patient.setDisease(disease.get());
		}
		patient.setLabTest(patientModel.getLabTest());
		patient.setAddedBy(patientModel.getUserId());
		patient.setModifiedBy(patientModel.getUserId());
		patient.setAddedAt(new Date());
		patient.setModifiedAt(new Date());
		logger.info("Patient added successfully : {}", patientModel.getName());
		return formPatientDto(patientRepo.save(patient));
	}
	
	@Override
	public PatientDto updatePatient(long patientId, long userId, PatientUpdateModel model) {
		if(!userService.isAdmin(userId)) {
			logger.error("User dont have permission to update patient - userId : {}", userId);
			throw new CovidTrackerException("User dont have permission to update patient");
		}
		logger.info("User has admin access to update patient - userId : {}", userId);
		Optional<Patient> optional = patientRepo.findById(patientId);
		if(optional.isPresent()) {
			Patient patient = optional.get();
			if(!patient.getLabTest().equalsIgnoreCase(model.getLabTest())) {
				patient.setLabTest(model.getLabTest());
			}
			
			if(!patient.getPatientStatus().equalsIgnoreCase(model.getStatus())) {
				patient.setPatientStatus(model.getStatus());
			}
			patient.setModifiedAt(new Date());
			patient.setModifiedBy(userId);
			return formPatientDto(patientRepo.save(patient));
		} else {
			logger.error("Patient not found - patientId : {}", patientId);
			throw new CovidTrackerException("Patient not found");
		}
		
	}
	
	
	public PatientDto formPatientDto(Patient patient) {
		Address address = patient.getAddress();
		AddressDto addressDto = new AddressDto(address.getId(), address.getStreet(), address.getCity(), address.getState());
		DiseaseDto diseaseDto = diseaseService.formDiseaseDto(patient.getDisease());
		
		Hospital hospital = patient.getHospital();
		HospitalDto hospitalDto = new HospitalDto(hospital.getId(), hospital.getHospitalName(), hospital.getHospitalType(),
				hospital.getFreeBeds(), hospital.getZoneType(), hospital.getIcuBeds(), hospital.getGeneralBeds(),
				hospital.getAddedBy(), hospital.getModifiedBy(), hospital.getAddedAt(), hospital.getModifiedAt(), 
				null, null, null);

		return new PatientDto(patient.getId(), patient.getPatientName(), patient.getPatientStatus(), patient.getLabTest(),
				patient.getPatientAge(), patient.getAddedBy(), patient.getModifiedBy(), patient.getAddedAt(), patient.getModifiedAt(),
				addressDto, diseaseDto, hospitalDto);
	}

	@Override
	public OverallPatientHistoryDto getOverallPatientHistory() {
		logger.info("getOverallPatientHistory triggered in service");
		List<Patient> patientList = patientRepo.findAll();
		OverallPatientHistoryDto history = new OverallPatientHistoryDto();
		history.setTotalConfirmedCases(patientList.stream().filter(each -> each.getPatientStatus().equalsIgnoreCase("confirmed") || each.getPatientStatus().equalsIgnoreCase("isolated")).collect(Collectors.toList()).size());
		history.setTotalDeathCases(patientList.stream().filter(each -> each.getPatientStatus().equalsIgnoreCase("death") && each.getLabTest().equalsIgnoreCase("positive")).collect(Collectors.toList()).size());
		history.setTotalRecoveredCases(patientList.stream().filter(each -> each.getPatientStatus().equalsIgnoreCase("recovered")).collect(Collectors.toList()).size());
		history.setTotalIsolatedCases(patientList.stream().filter(each -> each.getPatientStatus().equalsIgnoreCase("isolated") || each.getPatientStatus().equalsIgnoreCase("confirmed")).collect(Collectors.toList()).size());
		history.setTotalLabTest(patientList.stream().filter(each -> each.getLabTest().equalsIgnoreCase("positive")).collect(Collectors.toList()).size());
		history.setTotalCases(patientList.stream().filter(each -> each.getLabTest().equalsIgnoreCase("positive") && (each.getPatientStatus().equalsIgnoreCase("isolated") || each.getPatientStatus().equalsIgnoreCase("confirmed"))).collect(Collectors.toList()).size());
		history.setTotalCasesInLast24Hrs(patientList.stream().filter(each -> each.getAddedAt().getTime() > System.currentTimeMillis() - 24 * 60 * 60 * 1000 && (each.getLabTest().equalsIgnoreCase("positive") && (each.getPatientStatus().equalsIgnoreCase("isolated") || each.getPatientStatus().equalsIgnoreCase("confirmed")))).collect(Collectors.toList()).size());
		return history;
	}

}
