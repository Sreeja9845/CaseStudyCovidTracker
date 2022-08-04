import axios from 'axios';  
//This file is one -> it have all backend API calls
const BACKEND_APP_URL = "http://localhost:8082/api";


export const login = (email,password) => {
    return axios({
            url: BACKEND_APP_URL+"/signin",
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
              "email":email,
              "password":password
              })
          });
}

export const registerUser = (fname, lname, email, password, cnumber, role) => {
  console.log("register user called"+JSON.stringify({
                  "firstName":fname,
                  "lastName":lname,
                  "password":password,
                  "email":email,
                  "mobile":cnumber,
                  "role":role
                  }));
    return axios({
            url: BACKEND_APP_URL+"/register", 
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
                  "firstName":fname,
                  "lastName":lname,
                  "password":password,
                  "email":email,
                  "mobile":cnumber,
                  "role":role
              })
          });
}
export const getAllPatientsHistory = () => {
  return axios({
    url: BACKEND_APP_URL+"/view", 
    headers: {'Content-Type': 'application/json'},
    method: "GET"
  });
}

export const addDisease = (diseaseName, virusName, diseaseVarient) => {
  console.log("addDisease called"+JSON.stringify({
                  "diseaseName":diseaseName,
                  "virusName":virusName,
                  "diseaseVarient":diseaseVarient,
                  "userId":localStorage.getItem("userId")
                  }));
    return axios({
            url: BACKEND_APP_URL+"/disease", 
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
              "name":diseaseName,
              "virusName":virusName,
              "varient":diseaseVarient,
              "userId":localStorage.getItem("userId")
              })
          });
}

export const editDiseases = (diseaseId, diseaseName, virusName, diseaseVarient) => {
  console.log("editDiseases called"+JSON.stringify({
                  "diseaseName":diseaseName,
                  "virusName":virusName,
                  "diseaseVarient":diseaseVarient,
                  "userId":localStorage.getItem("userId")
                  }));
    return axios({
            url: BACKEND_APP_URL+"/disease/"+diseaseId, 
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
              "name":diseaseName,
              "virusName":virusName,
              "varient":diseaseVarient,
              "userId":localStorage.getItem("userId")
              })
          });
}

export const getAllDiseases = () => {
  return axios({
          url: BACKEND_APP_URL+"/disease", 
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        });
}

export const getAllHospitals = () => {
  return axios({
          url: BACKEND_APP_URL+"/hospital", 
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        });
}

export const searchHospitals = (selectedZone, selectedType, isFreeBeds, isGeneralBeds, isICUBeds) => {
  return axios({
          url: BACKEND_APP_URL+"/hospital?zone="+selectedZone+"&type="+selectedType+"&freebeds="+isFreeBeds+"&generalBeds="+isGeneralBeds+"&icuBeds="+isICUBeds, 
          method: "GET",
          headers: {'Content-Type': 'application/json'}
        });
}

export const getHospitalById = (id) => {
  return axios({
    url: BACKEND_APP_URL+"/hospital/"+id, 
    method: "GET",
    headers: {'Content-Type': 'application/json'}
  });
}

export const deleteDiseases = (id) => {
  return axios({
    url: BACKEND_APP_URL+"/disease/"+id+"/"+localStorage.getItem("userId"), 
    method: "DELETE",
    headers: {'Content-Type': 'application/json'}
  });
}

export const deleteHospitals = (id) => {
  return axios({
    url: BACKEND_APP_URL+"/hospital/"+id+"/"+localStorage.getItem("userId"), 
    method: "DELETE",
    headers: {'Content-Type': 'application/json'}
  });
}

export const editHospitals = (hospitalId, freeBeds, generalBeds, icuBeds) => {
  console.log("editHospitals called"+JSON.stringify({
                  "icuBeds":icuBeds,
                  "freeBeds":freeBeds,
                  "generalBeds":generalBeds,
                  "userId":localStorage.getItem("userId")
                  }));
    return axios({
            url: BACKEND_APP_URL+"/hospital/"+hospitalId+"/"+localStorage.getItem("userId"), 
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
              "icuBeds":icuBeds,
              "freeBeds":freeBeds,
              "generalBeds":generalBeds,
              })
          });
}
export const addHospital = (hospitalName, hospitalType, zone, freeBeds, generalBeds, icuBeds,
  street, city, state, diseases) => {
  console.log("addHospital called"+JSON.stringify({
                  "userId":localStorage.getItem("userId"),
                  "hospitalName":hospitalName,
                  "hospitalType":hospitalType,
                  "zone":zone,
                  "freeBeds":freeBeds,
                  "generalBeds":generalBeds,
                  "icuBeds":icuBeds,
                  "street":street,
                  "city":city,
                  "state":state,
                  "diseaseList":diseases
                  }));
    return axios({
            url: BACKEND_APP_URL+"/hospital", 
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
              "userId":localStorage.getItem("userId"),
              "hospitalName":hospitalName,
              "hospitalType":hospitalType,
              "zone":zone,
              "freeBeds":freeBeds,
              "generalBeds":generalBeds,
              "icuBeds":icuBeds,
              "street":street,
              "city":city,
              "state":state,
              "diseaseList":diseases
              })
          });
}
export const addPatients = (patientName, patientStatus, age, labtest, hospitalId, diseaseId,
  street, city, state) => {
  console.log("addPatients called"+JSON.stringify({
                  "userId":localStorage.getItem("userId"),
                  "name":patientName,
                  "age":age,
                  "status":patientStatus,
                  "labTest":labtest,
                  "hospitalId":hospitalId,
                  "diseaseId":diseaseId,
                  "street":street,
                  "city":city,
                  "state":state
                  }));
    return axios({
            url: BACKEND_APP_URL+"/patient", 
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
              "userId":localStorage.getItem("userId"),
                  "name":patientName,
                  "age":age,
                  "status":patientStatus,
                  "labTest":labtest,
                  "hospitalId":hospitalId,
                  "diseaseId":diseaseId,
                  "street":street,
                  "city":city,
                  "state":state
              })
          });
}

export const editPatients = (patientStatus, labtest, patientId) => {
  console.log("editPatients called"+JSON.stringify({
                  "status":patientStatus,
                  "labTest":labtest
                  }));
    return axios({
            url: BACKEND_APP_URL+"/patient/"+patientId+"/"+localStorage.getItem("userId"), 
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({
              "status":patientStatus,
              "labTest":labtest
              })
          });
}
