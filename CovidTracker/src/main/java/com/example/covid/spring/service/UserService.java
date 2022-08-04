package com.example.covid.spring.service;

import com.example.covid.spring.dto.UserDto;
import com.example.covid.spring.entity.User;
import com.example.covid.spring.model.LoginModel;

public interface UserService {
	 public UserDto register(User user);
	 UserDto loginUser(LoginModel login);
	 boolean isAdmin(long id);
}
