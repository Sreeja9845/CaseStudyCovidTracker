package com.example.covid.spring.exception;

public class CovidTrackerException extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public CovidTrackerException(String errorMessage) {  
    	super(errorMessage);  
    } 
	
}
