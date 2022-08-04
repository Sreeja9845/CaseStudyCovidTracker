package com.example.covid.spring.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.covid.spring.dto.DiseaseDto;
import com.example.covid.spring.entity.Disease;
import com.example.covid.spring.exception.CovidTrackerException;
import com.example.covid.spring.model.DiseaseModel;
import com.example.covid.spring.repository.DiseaseRepository;
import com.example.covid.spring.service.impl.DiseaseServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest
class DiseaseServiceImplTest {

	@InjectMocks
	private DiseaseServiceImpl accountService;

	@Mock
	private DiseaseRepository diseaseRepository;
	@Mock
	private UserService userService;

	@BeforeEach
	public void initiate() {
		System.out.println("Initiating the before steps");
	}

	@Test
	void addDisease() throws Exception {
		Mockito.when(diseaseRepository.save(any(Disease.class))).thenReturn(getDiseaseObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(true);
		DiseaseDto dto = accountService.addDisease(formDiseaseModel());
		assertThat(dto.getDiseaseName()).isEqualTo("covid");
	}
	
	@Test
	void updateDisease() throws Exception {
		Mockito.when(diseaseRepository.findById(any(Long.class))).thenReturn(Optional.of(getDiseaseObject()));
		Mockito.when(diseaseRepository.save(any(Disease.class))).thenReturn(getDiseaseObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(true);
		DiseaseDto dto = accountService.updateDiseaseById(1, formDiseaseModel());
		assertThat(dto.getDiseaseName()).isEqualTo("covid");
	}
	
	@Test
	void deleteDisease() throws Exception {
		Mockito.doNothing().when(diseaseRepository).deleteById(any(Long.class));
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(true);
		accountService.deleteDiseaseById(1, 1);
	}
	
	@Test
	void getAllDisease() throws Exception {
		List<Disease> list = new ArrayList<>();
		list.add(getDiseaseObject());
		Mockito.when(diseaseRepository.findAll()).thenReturn(list);
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(true);
		List<DiseaseDto> allDiseases = accountService.getAllDiseases();
		assertThat(allDiseases.size()).isEqualTo(1);
	}
	
	@Test
	void addDiseaseWithoutPermission() throws Exception {
		Mockito.when(diseaseRepository.save(any(Disease.class))).thenReturn(getDiseaseObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(false);
		assertThrows(CovidTrackerException.class,() -> accountService.addDisease(formDiseaseModel()) );
	}
	
	@Test
	void updateDiseaseWithoutPermission() throws Exception {
		Mockito.when(diseaseRepository.save(any(Disease.class))).thenReturn(getDiseaseObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(false);
		assertThrows(CovidTrackerException.class,() -> accountService.updateDiseaseById(1,formDiseaseModel()) );
	}
	
	@Test
	void deleteDiseaseWithoutPermission() throws Exception {
		Mockito.when(diseaseRepository.save(any(Disease.class))).thenReturn(getDiseaseObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(false);
		assertThrows(CovidTrackerException.class,() -> accountService.deleteDiseaseById(1,1) );
	}

	private Disease getDiseaseObject() {
		Disease disease = new Disease();
		disease.setDiseaseName("covid");
		disease.setVariant("delta");
		disease.setVirusName("corona");
		disease.setAddedBy(1);
		return disease;
	}

	private DiseaseModel formDiseaseModel() {
		DiseaseModel model = new DiseaseModel();
		model.setName("covid");
		model.setVarient("delta");
		model.setVirusName("corona");
		model.setUserId(1);
		return model;
	}
}
