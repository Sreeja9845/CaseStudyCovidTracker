package com.example.covid.spring.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.covid.spring.dto.UserDto;
import com.example.covid.spring.entity.User;
import com.example.covid.spring.exception.CovidTrackerException;
import com.example.covid.spring.model.LoginModel;
import com.example.covid.spring.repository.UserRepository;
import com.example.covid.spring.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	UserRepository userRepo;

	@Override
	public UserDto register(User user) {
		logger.info("Registering user : {}", user.getEmail());
		User userBasedOnEmail = userRepo.findByEmail(user.getEmail());
		if(userBasedOnEmail != null) {
			logger.error("Email already taken");
			throw new CovidTrackerException("Email already taken");
		}
		User userFromDb = userRepo.save(user);
		logger.info("Registered user successfully : {}", user.getEmail());
		return formUserDto(userFromDb);
	}
	
	@Override
	public UserDto loginUser(LoginModel login) {
		User user = userRepo.findByEmailAndPassword(login.getEmail(), login.getPassword());
		if(user==null) {
			logger.error("User credentials is not valid");
			throw new CovidTrackerException("User credentials is not valid");
		} else {
			logger.info("login user successfully : {}", user.getEmail());
			return formUserDto(user);
		}
	}

	@Override
	public boolean isAdmin(long id) {
		logger.info("Checking user is admin : userId : {}", id);
		User user = userRepo.findById(id);
		return (user!=null) ? user.getRole().equals("admin") : false;
	}
	
	private UserDto formUserDto(User user) {
		return new UserDto(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getMobile(), user.getRole());
	}

}
