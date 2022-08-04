package com.example.covid.spring.service;

import com.example.covid.spring.dto.OverallPatientHistoryDto;
import com.example.covid.spring.dto.PatientDto;
import com.example.covid.spring.entity.Patient;
import com.example.covid.spring.model.PatientModel;
import com.example.covid.spring.model.PatientUpdateModel;

public interface PatientService {
	PatientDto addPatient(PatientModel patient);
	PatientDto formPatientDto(Patient patient);
	PatientDto updatePatient(long patientId, long userId, PatientUpdateModel model);
	OverallPatientHistoryDto getOverallPatientHistory();
}
