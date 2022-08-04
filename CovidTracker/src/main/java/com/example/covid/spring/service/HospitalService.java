package com.example.covid.spring.service;

import java.util.List;

import com.example.covid.spring.dto.HospitalDto;
import com.example.covid.spring.model.HospitalModel;
import com.example.covid.spring.model.HospitalUpdateModel;

public interface HospitalService {
	HospitalDto addHospital(HospitalModel hospital);
	void deleteHospitalById(long hospitalId, long userId);
	HospitalDto updateHospitalById(long hospitalId, long userId, HospitalUpdateModel model);
	List<HospitalDto> getAllHospitals(String zone, String type, boolean freebedsAvailability, boolean generalBedsAvailability,
			boolean icuBedsAvailability);
	HospitalDto getHospitalById(long hospitalId);
}
