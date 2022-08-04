package com.example.covid.spring.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;

import java.util.ArrayList;
import java.util.Date;
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
import com.example.covid.spring.service.impl.PatientServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest
class PatientServiceImplTest {

	@InjectMocks
	private PatientServiceImpl patientService;

	@Mock
	PatientRepository patientRepo;
	
	@Mock
	HospitalRepository hospitalRepo;
	
	@Mock
	DiseaseRepository diseaseRepo;
	
	@Mock
	DiseaseService diseaseService;
	
	@Mock
	private UserService userService;

	@BeforeEach
	public void initiate() {
		System.out.println("Initiating the before steps");
	}

	@Test
	void addPatient() throws Exception {
		Mockito.when(patientRepo.save(any(Patient.class))).thenReturn(getPatientObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(true);
		Mockito.when(hospitalRepo.findById(any(Long.class))).thenReturn(Optional.of(getHospitalObject()));
		Mockito.when(diseaseRepo.findById(any(Long.class))).thenReturn(Optional.of(getDiseaseObject()));
		PatientDto dto = patientService.addPatient(formPatientModel());
		assertThat(dto.getPatientName()).isEqualTo("name");
	}
	
	@Test
	void updatePatient() throws Exception {
		Mockito.when(patientRepo.save(any(Patient.class))).thenReturn(getPatientObject());
		Mockito.when(patientRepo.findById(any(Long.class))).thenReturn(Optional.of(getPatientObject()));
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(true);
		Mockito.when(hospitalRepo.findById(any(Long.class))).thenReturn(Optional.of(getHospitalObject()));
		Mockito.when(diseaseRepo.findById(any(Long.class))).thenReturn(Optional.of(getDiseaseObject()));
		PatientDto dto = patientService.updatePatient(1,1,formPatientUpdateModelModel());
		assertThat(dto.getPatientName()).isEqualTo("name");
	}
	
	@Test
	void getOverAllPatients() throws Exception {
		List<Patient> patientList = new ArrayList<Patient>();
		patientList.add(getPatientObject());
		Mockito.when(patientRepo.findAll()).thenReturn(patientList);
		OverallPatientHistoryDto dto = patientService.getOverallPatientHistory();
		assertThat(dto.getTotalCases()).isEqualTo(1);
	}
	
	
	@Test
	void addPatientWithOutPermission() throws Exception {
		Mockito.when(patientRepo.save(any(Patient.class))).thenReturn(getPatientObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(false);
		Mockito.when(hospitalRepo.findById(any(Long.class))).thenReturn(Optional.of(getHospitalObject()));
		Mockito.when(diseaseRepo.findById(any(Long.class))).thenReturn(Optional.of(getDiseaseObject()));
		assertThrows(CovidTrackerException.class,() -> patientService.addPatient(formPatientModel()));
	}
	

	@Test
	void updatePatientWithOutPermission() throws Exception {
		Mockito.when(patientRepo.save(any(Patient.class))).thenReturn(getPatientObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(false);
		Mockito.when(hospitalRepo.findById(any(Long.class))).thenReturn(Optional.of(getHospitalObject()));
		Mockito.when(diseaseRepo.findById(any(Long.class))).thenReturn(Optional.of(getDiseaseObject()));
		assertThrows(CovidTrackerException.class,() -> patientService.updatePatient(1,1,formPatientUpdateModelModel()));
	}
	
	
	private PatientUpdateModel formPatientUpdateModelModel() {
		PatientUpdateModel model = new PatientUpdateModel();
		model.setLabTest("positive");
		model.setStatus("confirmed");
		return model;
	}
	private PatientModel formPatientModel() {
		PatientModel model = new PatientModel();
		model.setName("name");
		model.setAge(22);
		model.setDiseaseId(1);
		model.setUserId(1);
		model.setCity("city");
		model.setHospitalId(1);
		model.setLabTest("positive");
		model.setState("state");
		model.setStreet("street");
		model.setStatus("confirmed");
		return model;
	}
	
	private Patient getPatientObject() {
		Patient patient = new Patient();
		patient.setPatientName("name");
		patient.setPatientStatus("confirmed");
		patient.setPatientAge(22);
		patient.setLabTest("positive");
		patient.setAddedBy(1);
		patient.setAddedAt(new Date());
		patient.setAddress(getAddress());
		patient.setHospital(getHospitalObject());
		patient.setDisease(getDiseaseObject());
		patient.setAddedBy(1);
		return patient;
	}
	
	private Hospital getHospitalObject() {
		Hospital hospital = new Hospital();
		hospital.setHospitalName("AAA");
		hospital.setHospitalType("general");
		hospital.setZoneType("red");
		hospital.setFreeBeds(1);
		hospital.setGeneralBeds(1);
		hospital.setIcuBeds(1);
		hospital.setAddedBy(1);
		List<Disease> diseaseList = new ArrayList<Disease>();
		List<Patient> patientList = new ArrayList<Patient>();
		//patientList.add(getPatientObject());
		//diseaseList.add(getDiseaseObject());
		hospital.setDiseases(diseaseList);
		hospital.setPatients(patientList);
		hospital.setAddress(getAddress());
		return hospital;
	}
	
	private Disease getDiseaseObject() {
		Disease disease = new Disease();
		disease.setDiseaseName("covid");
		disease.setVariant("delta");
		disease.setVirusName("corona");
		disease.setAddedBy(1);
		return disease;
	}
	private Address getAddress() {
		Address address = new Address();
		address.setCity("city");
		address.setState("state");
		address.setStreet("street");
		return address;
	}

}
