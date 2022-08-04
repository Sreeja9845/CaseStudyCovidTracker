package com.example.covid.spring.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.covid.spring.dto.HospitalDto;
import com.example.covid.spring.entity.Address;
import com.example.covid.spring.entity.Disease;
import com.example.covid.spring.entity.Hospital;
import com.example.covid.spring.entity.Patient;
import com.example.covid.spring.exception.CovidTrackerException;
import com.example.covid.spring.model.HospitalModel;
import com.example.covid.spring.model.HospitalUpdateModel;
import com.example.covid.spring.repository.DiseaseRepository;
import com.example.covid.spring.repository.HospitalRepository;
import com.example.covid.spring.service.impl.HospitalServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest
class HospitalServiceImplTest {

	@InjectMocks
	private HospitalServiceImpl hospitalService;

	@Mock
	private HospitalRepository hospitalRepo;
	@Mock
	private UserService userService;
	
	@Mock
    private EntityManager entityManager;
	
	@MockBean
	CriteriaBuilder cb;
	
	@Mock 
	CriteriaQuery<Hospital> query;
	
	@Mock
	TypedQuery tq;
	
	@Mock
	Root root;
	
	@Mock
	Path<String> path;
	
	@Mock
	DiseaseRepository diseaseRepo;
	
	@Mock
	DiseaseService diseaseService;
	
	@Mock
	PatientService patientService;
	
	@Test
	void addHospital() throws Exception {
		Mockito.when(hospitalRepo.save(any(Hospital.class))).thenReturn(getHospitalObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(true);
		Mockito.when(diseaseRepo.findById(any(Long.class))).thenReturn(Optional.of(getDiseaseObject()));
		HospitalDto dto = hospitalService.addHospital(formHospitalModelObject());
		assertThat(dto.getHospitalName()).isEqualTo("AAA");
	}
	
	@Test
	void updateHospital() throws Exception {
		Mockito.when(hospitalRepo.save(any(Hospital.class))).thenReturn(getHospitalObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(true);
		Mockito.when(hospitalRepo.findById(any(Long.class))).thenReturn(Optional.of(getHospitalObject()));
		HospitalDto dto = hospitalService.updateHospitalById(1,1,formHospitalUpdateModelObject());
		assertThat(dto.getHospitalName()).isEqualTo("AAA");
	}
	
	@Test
	void getHospitalById() throws Exception {
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(true);
		Mockito.when(hospitalRepo.findById(any(Long.class))).thenReturn(Optional.of(getHospitalObject()));
		HospitalDto dto = hospitalService.getHospitalById(1);
		assertThat(dto.getHospitalName()).isEqualTo("AAA");
	}
	
	@Test
	void getAllHospitals() throws Exception {
		List<Hospital> hospitalList = new ArrayList<Hospital>();
		hospitalList.add(getHospitalObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(true);
		Mockito.when(entityManager.getCriteriaBuilder()).thenReturn(cb);
		Mockito.when(entityManager.createQuery(any(CriteriaQuery.class))).thenReturn(tq);
		Mockito.when(tq.getResultList()).thenReturn(hospitalList);
		Mockito.when(cb.createQuery(Hospital.class)).thenReturn(query);
		Mockito.when(hospitalRepo.findById(any(Long.class))).thenReturn(Optional.of(getHospitalObject()));
		List<HospitalDto> dto = hospitalService.getAllHospitals("","",false,false,false);
		assertThat(dto.size()).isEqualTo(1);
	}
	
	@Test
	void getAllHospitalsWithFilters() throws Exception {
		List<Hospital> hospitalList = new ArrayList<Hospital>();
		hospitalList.add(getHospitalObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(true);
		Mockito.when(entityManager.getCriteriaBuilder()).thenReturn(cb);
		Mockito.when(entityManager.createQuery(any(CriteriaQuery.class))).thenReturn(tq);
		Mockito.when(tq.getResultList()).thenReturn(hospitalList);
		Mockito.when(cb.createQuery(Hospital.class)).thenReturn(query);
		Mockito.when(query.from(Hospital.class)).thenReturn(root);
		Mockito.when(root.get(any(String.class))).thenReturn(path);
		Mockito.when(hospitalRepo.findById(any(Long.class))).thenReturn(Optional.of(getHospitalObject()));
		List<HospitalDto> dto = hospitalService.getAllHospitals("red","general",true,true,true);
		assertThat(dto.size()).isEqualTo(1);
	}
	
	@Test
	void addHospitalWithoutPermission() throws Exception {
		Mockito.when(hospitalRepo.save(any(Hospital.class))).thenReturn(getHospitalObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(false);
		assertThrows(CovidTrackerException.class,() -> hospitalService.addHospital(formHospitalModelObject()) );
	}
	
	@Test
	void updateHospitalWithoutPermission() throws Exception {
		Mockito.when(hospitalRepo.save(any(Hospital.class))).thenReturn(getHospitalObject());
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(false);
		assertThrows(CovidTrackerException.class,() -> hospitalService.updateHospitalById(1,1,formHospitalUpdateModelObject()));
	}
	
	@Test
	void deleteHospitalWithoutPermission() throws Exception {
		Mockito.doNothing().when(hospitalRepo).deleteById(any(Long.class));
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(false);
		assertThrows(CovidTrackerException.class,() -> hospitalService.deleteHospitalById(1, 1));
	}
	
	
	@Test
	void deleteHospital() throws Exception {
		Mockito.doNothing().when(hospitalRepo).deleteById(any(Long.class));
		Mockito.when(userService.isAdmin(any(Long.class))).thenReturn(true);
		hospitalService.deleteHospitalById(1, 1);
	}
	
	
	
	
	
	
	
	private HospitalModel formHospitalModelObject() {
		HospitalModel hospital = new HospitalModel();
		hospital.setHospitalName("AAA");
		hospital.setHospitalType("general");
		hospital.setZone("red");
		hospital.setFreeBeds(1);
		hospital.setGeneralBeds(1);
		hospital.setIcuBeds(1);
		hospital.setUserId(1);
		hospital.setCity("city");
		hospital.setState("state");
		hospital.setStreet("street");
		
		List<Integer> diseaseList = new ArrayList<Integer>();
		diseaseList.add(1);
		hospital.setDiseaseList(diseaseList);
		return hospital;
	}
	
	private HospitalUpdateModel formHospitalUpdateModelObject() {
		HospitalUpdateModel hospital = new HospitalUpdateModel();
		hospital.setFreeBeds(1);
		hospital.setGeneralBeds(1);
		hospital.setIcuBeds(1);
		return hospital;
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
	
	private Patient getPatientObject() {
		Patient patient = new Patient();
		patient.setPatientName("name");
		patient.setPatientStatus("confirmed");
		patient.setPatientAge(22);
		patient.setLabTest("positive");
		patient.setAddedBy(1);
		patient.setAddress(getAddress());
		patient.setHospital(getHospitalObject());
		patient.setDisease(getDiseaseObject());
		patient.setAddedBy(1);
		return patient;
	}
	
	private Address getAddress() {
		Address address = new Address();
		address.setCity("city");
		address.setState("state");
		address.setStreet("street");
		return address;
	}

}
