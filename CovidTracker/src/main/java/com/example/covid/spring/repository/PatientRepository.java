package com.example.covid.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.covid.spring.entity.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{

}
