package com.example.covid.spring.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.covid.spring.dto.AddressDto;
import com.example.covid.spring.dto.DiseaseDto;
import com.example.covid.spring.dto.HospitalDto;
import com.example.covid.spring.dto.PatientDto;
import com.example.covid.spring.entity.Address;
import com.example.covid.spring.entity.Disease;
import com.example.covid.spring.entity.Hospital;
import com.example.covid.spring.entity.Patient;
import com.example.covid.spring.exception.CovidTrackerException;
import com.example.covid.spring.model.HospitalModel;
import com.example.covid.spring.model.HospitalUpdateModel;
import com.example.covid.spring.repository.DiseaseRepository;
import com.example.covid.spring.repository.HospitalRepository;
import com.example.covid.spring.service.DiseaseService;
import com.example.covid.spring.service.HospitalService;
import com.example.covid.spring.service.PatientService;
import com.example.covid.spring.service.UserService;

@Service
public class HospitalServiceImpl implements HospitalService {
	
	private static final Logger logger = LoggerFactory.getLogger(HospitalServiceImpl.class);
	
	@Autowired
	HospitalRepository hospitalRepo;
	
	@PersistenceContext
    private EntityManager entityManager;
	
	@Autowired
	DiseaseRepository diseaseRepo;
	
	@Autowired
	DiseaseService diseaseService;
	
	@Autowired
	PatientService patientService;
	
	@Autowired
	UserService userService;
	
	@Override
	public HospitalDto addHospital(HospitalModel hospitalModel) {
		if(!userService.isAdmin(hospitalModel.getUserId())) {
			throw new CovidTrackerException("User dont have permission to add hospital");
		}
		logger.info("User has admin access - userId : {}", hospitalModel.getUserId());
		Address address = new Address();
		address.setStreet(hospitalModel.getStreet());
		address.setCity(hospitalModel.getCity());
		address.setState(hospitalModel.getState());
		
		Hospital hospital = new Hospital();
		hospital.setHospitalName(hospitalModel.getHospitalName());
		hospital.setHospitalType(hospitalModel.getHospitalType());
		hospital.setAddress(address);
		hospital.setAddedBy(hospitalModel.getUserId());
		hospital.setModifiedBy(hospitalModel.getUserId());
		hospital.setAddedAt(new Date());
		hospital.setModifiedAt(new Date());
		hospital.setFreeBeds(hospitalModel.getFreeBeds());
		hospital.setGeneralBeds(hospitalModel.getGeneralBeds());
		hospital.setIcuBeds(hospitalModel.getIcuBeds());
		hospital.setZoneType(hospitalModel.getZone());
		List<Disease> diseaseList = hospital.getDiseases();
		if(diseaseList==null) {
			diseaseList = new ArrayList<>();
		}
		for(long each : hospitalModel.getDiseaseList()) {
			Optional<Disease> disease = diseaseRepo.findById(each);
			if(disease.isPresent()) {
				diseaseList.add(disease.get());
			}
		}
		hospital.setDiseases(diseaseList);
		return formHospitalDto(hospitalRepo.save(hospital));
	}

	@Override
	public void deleteHospitalById(long hospitalId, long userId) {
		if(!userService.isAdmin(userId)) {
			logger.info("User dont have permission to delete hospital - userId : {}", userId);
			throw new CovidTrackerException("User dont have permission to delete hospital");
		}
		logger.info("User has admin access to delete hospital - userId : {}", userId);
		hospitalRepo.deleteById(hospitalId);
	}

	@Override
	public HospitalDto updateHospitalById(long hospitalId, long userId, HospitalUpdateModel model) {
		if(!userService.isAdmin(userId)) {
			logger.info("User dont have permission to update hospital - userId : {}", userId);
			throw new CovidTrackerException("User dont have permission to update hospital");
		}
		logger.info("User has admin access to update hospital - userId : {}", userId);
		Optional<Hospital> optional = hospitalRepo.findById(hospitalId);
		if(optional.isPresent()) {
			Hospital hospital = optional.get();
			if(hospital.getFreeBeds()!=model.getFreeBeds())
				hospital.setFreeBeds(model.getFreeBeds());
			if(hospital.getGeneralBeds()!=model.getGeneralBeds())
				hospital.setGeneralBeds(model.getGeneralBeds());
			if(hospital.getIcuBeds()!=model.getIcuBeds())
				hospital.setIcuBeds(model.getIcuBeds());
			
			hospital.setModifiedAt(new Date());
			hospital.setModifiedBy(userId);
			return formHospitalDto(hospitalRepo.save(hospital));
		} else {
			throw new CovidTrackerException("Hospital not found");
		}
	}

	@Override
	public List<HospitalDto> getAllHospitals(String zone, String type, boolean freebedsAvailability,
			boolean generalBedsAvailability, boolean icuBedsAvailability) {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Hospital> q = cb.createQuery(Hospital.class);
		Root<Hospital> root = q.from(Hospital.class);
		List<Predicate> predicates = new ArrayList<>();
		if(!zone.equals("")) {
			predicates.add(cb.or(cb.like(cb.lower(root.get("zoneType")), "%" + zone.toLowerCase() + "%")));
		}
		if(!type.equals("")) {
			predicates.add(cb.or(cb.like(cb.lower(root.get("hospitalType")), "%" + type.toLowerCase() + "%")));
		}
		
		if(freebedsAvailability) {
			predicates.add(cb.or(cb.greaterThan(root.get("freeBeds"), 0)));
		}
		
		if(generalBedsAvailability) {
			predicates.add(cb.or(cb.greaterThan(root.get("generalBeds"), 0)));
		}
		if(icuBedsAvailability) {
			predicates.add(cb.or(cb.greaterThan(root.get("icuBeds"), 0)));
		}
		q.where(predicates.toArray(new Predicate[0]));
		TypedQuery<Hospital> typedQuery = entityManager.createQuery(q);
	    List<Hospital> hospitalList = typedQuery.getResultList();
	    return hospitalList.stream().map(each -> formHospitalDto(each)).collect(Collectors.toList());
	}
	
	private HospitalDto formHospitalDto(Hospital hospital) {
		Address address = hospital.getAddress();
		AddressDto addressDto = new AddressDto(address.getId(), address.getStreet(), address.getCity(), address.getState());
		
		List<Disease> diseases = hospital.getDiseases();
		if(diseases==null) {
			diseases = new ArrayList<>();
		}
		List<DiseaseDto> diseaseDtoList = diseases.stream().map(each -> diseaseService.formDiseaseDto(each)).collect(Collectors.toList());
		
		List<Patient> patients = hospital.getPatients();
		if(patients==null) {
			patients = new ArrayList<>();
		}
		List<PatientDto> patientDtoList = patients.stream().map(each -> patientService.formPatientDto(each)).collect(Collectors.toList());
		
		return new HospitalDto(hospital.getId(), hospital.getHospitalName(), hospital.getHospitalType(),
				hospital.getFreeBeds(), hospital.getZoneType(), hospital.getIcuBeds(), hospital.getGeneralBeds(),
				hospital.getAddedBy(), hospital.getModifiedBy(), hospital.getAddedAt(), hospital.getModifiedAt(), 
				addressDto, patientDtoList, diseaseDtoList);
	}

	@Override
	public HospitalDto getHospitalById(long hospitalId) {
		Optional<Hospital> optional = hospitalRepo.findById(hospitalId);
		if(optional.isPresent()) {
			Hospital hospital = optional.get();
			return formHospitalDto(hospital);
		}
		return null;
	}

}
