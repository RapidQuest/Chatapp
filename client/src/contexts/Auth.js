import { json } from "body-parser";
import React, { useContext, useState, useEffect } from "react";
import { Auth } from "../firebase";

const AuthContext = React.createContext();
const apiUrl = 'http://localhost:5000/';
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(name, email, password, role) {
    let user = {
      "name": name,
      "email": email,
      "password": password,
      "role": role,
      "chatId":[]
  }
  return fetch( apiUrl + 'users/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
          'Content-Type': 'application/json'
      },
  })
  .then(res => res.json()) 
  .then(data => console.log(data));
  }

// LOGIN FUNCTION
function loginUser(email, password) {
  let user = {
    "email": email,
    "password": password
}
	fetch(  apiUrl + 'users/login', {
		method: 'post',
		body: JSON.stringify(user),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			if (response.status == 200) {
				return response.json();
			} else {
				return response.json().then((json) => {
					throw new Error(json.message);
				});
			}
		})
		.then(function (data) {
      console.log(data);
      localStorage.setItem('token', data.id);
      localStorage.setItem('allUsers', JSON.stringify(data.allUsersData));
			storeProfileInfo('./homepage', data.loggedUser, true);
		})
		.catch(function (json) {
		});
}

function createChatId(id, currntUser, ChatTo){
  const data = {
    "chatId" : id,
    "currentUser": currentUser,
    "chatWith": ChatTo
  }
	fetch(  apiUrl + 'users/createChat', {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			if (response.status == 200) {
				return response.json();
			} else {
				return response.json().then((json) => {
					throw new Error(json.message);
				});
			}
		})
		.then(function (data) {
      console.log(data);
		})
		.catch(function (json) {
		});

}

function storeProfileInfo(url, user ,redirect) {
  localStorage.setItem("currentUser", JSON.stringify(user))
  console.log(localStorage.getItem("currentUser"));
  if (redirect) {
    window.location.href = url;
  } else {
  }
	// fetch(apiUrl + 'users/', {
	// 	method: 'get',
	// 	headers: {
	// 		token: localStorage.getItem('token'),
	// 	},
	// })
	// 	.then((response) => {
	// 		if (response.status == 200) {
	// 			console.log('All Ok getting user data');
	// 			return response.json();
	// 		}
  //     else{
  //       console.log('error');
  //     }
	// 	})
	// 	.then((json) => {
	// 		console.log('Storing user data');
	// 		localStorage.setItem('userInfo', JSON.stringify(json));
	// 		if (redirect) {
	// 			// window.location.href = url;
	// 		} else {
	// 		}
	// 	});
}

  function logout() {
    return localStorage.setItem('token', null) && localStorage.setItem('allUsers', null)
  }

  function resetPassword(email) {
    return Auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
      setCurrentUser(
        localStorage.getItem('currentUser'));
      setLoading(false);
  }, [ localStorage.getItem('currentUser')]);

  const value = {
    currentUser,
    loginUser,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
