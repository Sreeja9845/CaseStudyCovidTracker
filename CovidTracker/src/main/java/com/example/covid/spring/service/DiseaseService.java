package com.example.covid.spring.service;

import java.util.List;

import com.example.covid.spring.dto.DiseaseDto;
import com.example.covid.spring.entity.Disease;
import com.example.covid.spring.model.DiseaseModel;

public interface DiseaseService {
	DiseaseDto addDisease(DiseaseModel disease);
	List<DiseaseDto> getAllDiseases();
	DiseaseDto updateDiseaseById(long diseaseId,DiseaseModel disease);
	void deleteDiseaseById(long diseaseId, long userId);
	public DiseaseDto formDiseaseDto(Disease disease);
}
