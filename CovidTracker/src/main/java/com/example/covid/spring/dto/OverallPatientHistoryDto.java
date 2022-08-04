package com.example.covid.spring.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OverallPatientHistoryDto {
	private long totalCases;
	private long totalCasesInLast24Hrs;
	private long totalLabTest;
	private long totalConfirmedCases;
	private long totalIsolatedCases;
	private long totalRecoveredCases;
	private long totalDeathCases;
}
