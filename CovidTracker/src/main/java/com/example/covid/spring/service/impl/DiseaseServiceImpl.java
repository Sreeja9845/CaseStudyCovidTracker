package com.example.covid.spring.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.postgresql.util.PSQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.covid.spring.dto.DiseaseDto;
import com.example.covid.spring.entity.Disease;
import com.example.covid.spring.exception.CovidTrackerException;
import com.example.covid.spring.model.DiseaseModel;
import com.example.covid.spring.repository.DiseaseRepository;
import com.example.covid.spring.service.DiseaseService;
import com.example.covid.spring.service.UserService;

@Service
public class DiseaseServiceImpl implements DiseaseService{
	
	private static final Logger logger = LoggerFactory.getLogger(DiseaseServiceImpl.class);
	
	@Autowired
	DiseaseRepository diseaseRepo;
	
	@Autowired
	UserService userService;

	@Override
	public DiseaseDto addDisease(DiseaseModel diseaseModel) {
		if(!userService.isAdmin(diseaseModel.getUserId())) {
			throw new CovidTrackerException("User dont have permission to add disease");
		}
		logger.info("User has admin access to add disease- userId : {}", diseaseModel.getUserId());
		Disease disease = new Disease();
		disease.setAddedBy(diseaseModel.getUserId());
		disease.setModifiedBy(diseaseModel.getUserId());
		disease.setAddedAt(new Date());
		disease.setModifiedAt(new Date());
		disease.setDiseaseName(diseaseModel.getName());
		disease.setVariant(diseaseModel.getVarient());
		disease.setVirusName(diseaseModel.getVirusName());
		Disease diseaseFromDb = diseaseRepo.save(disease);
		logger.info("Disease added successfully : {}", diseaseModel.getName());
		return formDiseaseDto(diseaseFromDb);
	}

	@Override
	public List<DiseaseDto> getAllDiseases() {
		logger.info("get All Diseases successfully triggered");
		List<Disease> diseaseList = diseaseRepo.findAll();
		return diseaseList.stream().map(each -> formDiseaseDto(each)).collect(Collectors.toList());
	}

	@Override
	public DiseaseDto updateDiseaseById(long diseaseId, DiseaseModel diseaseModel) {
		if(!userService.isAdmin(diseaseModel.getUserId())) {
			logger.error("User dont have permission to add disease - userId : {}", diseaseModel.getUserId());
			throw new CovidTrackerException("User dont have permission to update disease");
		}
		logger.info("User has admin access - userId : {}", diseaseModel.getUserId());
		Optional<Disease> optional = diseaseRepo.findById(diseaseId);
		if(optional.isPresent()) {
			Disease disease = optional.get();
			if(!disease.getDiseaseName().equalsIgnoreCase(diseaseModel.getName()))
				disease.setDiseaseName(diseaseModel.getName());
			if(!disease.getVariant().equalsIgnoreCase(diseaseModel.getVarient()))
				disease.setVariant(diseaseModel.getVarient());
			if(!disease.getVirusName().equalsIgnoreCase(diseaseModel.getVirusName()))
				disease.setVirusName(diseaseModel.getVirusName());
			disease.setModifiedAt(new Date());
			disease.setModifiedBy(diseaseModel.getUserId());
			Disease diseaseFromDb = diseaseRepo.save(disease);
			return formDiseaseDto(diseaseFromDb);
		} else {
			logger.error("Disease not found - diseaseId : {}", diseaseId);
			throw new CovidTrackerException("Disease not found");
		}
	}

	@Override
	public void deleteDiseaseById(long diseaseId, long userId) {
		if(!userService.isAdmin(userId)) {
			logger.error("User dont have permission to delete disease - userId : {}", userId);
			throw new CovidTrackerException("User dont have permission to delete disease");
		}
		logger.info("User has admin access - userId : {}", userId);
		try {
			diseaseRepo.deleteById(diseaseId);
		} catch(Exception exp) {
			logger.error("Disease already mapped to patients : {}", exp.getMessage());
			throw new CovidTrackerException("Disease already mapped to patients");
		}
		
	}
	
	public DiseaseDto formDiseaseDto(Disease disease) {
		return new DiseaseDto(disease.getId(), disease.getVirusName(),disease.getDiseaseName(),
				disease.getVariant(), disease.getAddedBy(), disease.getModifiedBy(), disease.getAddedAt(),
				disease.getModifiedAt());
	}

}
