package com.example.covid.spring.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Disease {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String virusName;
	private String diseaseName;
	private String variant;
	private long addedBy;
    private long modifiedBy;
    private Date addedAt;
    private Date modifiedAt;
}
