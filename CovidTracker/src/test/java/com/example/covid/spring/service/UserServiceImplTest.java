package com.example.covid.spring.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.covid.spring.dto.UserDto;
import com.example.covid.spring.entity.User;
import com.example.covid.spring.exception.CovidTrackerException;
import com.example.covid.spring.model.LoginModel;
import com.example.covid.spring.repository.UserRepository;
import com.example.covid.spring.service.impl.UserServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest
class UserServiceImplTest {

	@InjectMocks
	private UserServiceImpl userService;
	
	@Mock
	UserRepository userRepo;
	
	@Test
	void addUser() throws Exception {
		Mockito.when(userRepo.findByEmail(any(String.class))).thenReturn(null);
		Mockito.when(userRepo.save(any(User.class))).thenReturn(formUserObject());
		UserDto dto = userService.register(formUserObject());
		assertThat(dto.getEmail()).isEqualTo("email@gmail.com");
	}
	
	@Test
	void loginUser() throws Exception {
		Mockito.when(userRepo.findByEmailAndPassword(any(String.class),any(String.class))).thenReturn(formUserObject());
		UserDto dto = userService.loginUser(formLoginObject());
		assertThat(dto.getEmail()).isEqualTo("email@gmail.com");
	}
	
	@Test
	void loginUserWithError() throws Exception {
		Mockito.when(userRepo.findByEmailAndPassword(any(String.class),any(String.class))).thenReturn(null);
		assertThrows(CovidTrackerException.class,() -> userService.loginUser(formLoginObject()));
	}
	
	@Test
	void isAdmin() throws Exception {
		Mockito.when(userRepo.findById(1)).thenReturn(formUserObject());
		boolean dto = userService.isAdmin(1);
		assertThat(dto).isEqualTo(true);
	}
	
	@Test
	void isAdminWithUserRole() throws Exception {
		Mockito.when(userRepo.findById(any(Long.class))).thenReturn(null);
		boolean dto = userService.isAdmin(1);
		assertThat(dto).isEqualTo(false);
	}
	
	@Test
	void addPatientWithExistingEmail() throws Exception {
		Mockito.when(userRepo.findByEmail(any(String.class))).thenReturn(formUserObject());
		Mockito.when(userRepo.save(any(User.class))).thenReturn(formUserObject());
		assertThrows(CovidTrackerException.class,() -> userService.register(formUserObject()));
	}
	
	private User formUserObject(){
		User user = new User();
		user.setEmail("email@gmail.com");
		user.setFirstName("fname");
		user.setLastName("lname");
		user.setMobile("8888888888");
		user.setPassword("password");
		user.setRole("admin");
		return user;
	}
	
	private LoginModel formLoginObject(){
		LoginModel user = new LoginModel();
		user.setEmail("email@gmail.com");
		user.setPassword("password");
		return user;
	}
	
	

}
