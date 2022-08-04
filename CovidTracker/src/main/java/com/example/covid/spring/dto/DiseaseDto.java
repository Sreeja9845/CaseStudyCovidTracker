package com.example.covid.spring.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class DiseaseDto {
	private long id;
	private String virusName;
	private String diseaseName;
	private String variant;
	private long addedBy;
    private long modifiedBy;
    private Date addedAt;
    private Date modifiedAt;
}
