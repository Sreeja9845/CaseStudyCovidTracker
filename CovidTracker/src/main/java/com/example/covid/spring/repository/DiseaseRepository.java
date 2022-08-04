package com.example.covid.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.covid.spring.entity.Disease;

@Repository
public interface DiseaseRepository extends JpaRepository<Disease, Long>{

}
