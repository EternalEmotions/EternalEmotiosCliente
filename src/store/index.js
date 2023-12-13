import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router'; // Ajusta la importación según la estructura de tu proyecto
import { eventListeners } from '@popperjs/core';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
     Usuarios: [],
    Likes: [],
    Testimonios: [],
    Presets: [],
    Orders: [],
    ordersTotal:[],
    Pagos:[],
    Eventos:[],
    Reservas: [],    

      //Login
      isAuthenticated: false,
      role: ''
  
  },
  mutations: {


    // Login
    setAuthenticated(state) {
      state.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
    },
    setRole(state, role) {
      state.role = role;
      localStorage.setItem('role', role);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = '';
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('role');
    },

    setUsuarios(state, payload) {
      state.Usuarios = payload;
    },
    setUsuariosId(state, setIDU) {
      state.Usuarios = state.Usuarios.filter(({ id }) => id === setIDU);
    },
    addUsuarios(state, payload) {
      state.Usuarios.push(payload);
    },
    deleteUsuarios(state, idToRemove) {
      state.Usuarios = state.Usuarios.filter(({ id }) => id !== idToRemove);
    },
    
    updateUsuarios(state, updateUsuarios) {
      // Actualiza el usuario en el estado con los nuevos datos
      state.Usuarios = state.Usuarios.filter(({ id }) => id !== updateUsuarios);
    },
    
    setLikes(state, payload) {
      state.Likes = payload;
    },
    

    addLike(state, likeInfo) {
      state.Likes.push(likeInfo);
    },


    //Testimonios
    setTestimonios(state, payload) {
      state.Testimonios = payload;
    },
    setTestimoniosDate(state, setIDU) {
      state.Testimonios = state.Testimonios.filter(({ id }) => id === setIDU);
    },
    addTestimonios(state, payload) {
      state.Testimonios.push(payload);
    },
    deleteTestimonios(state, idToRemove) {
      state.Testimonios = state.Testimonios.filter(({ id }) => id !== idToRemove);
    },

    //Presets
    setPresets(state, payload) {
      state.Presets = payload;
    },
 
    addPresets(state, payload) {
      state.Presets.push(payload);
    },
    deletePresets(state, presetId) {
      state.Presets = state.Presets.filter(preset => preset.id !== presetId);
    },
    presetFilters(state, data) {
      state.Presets = data;
    },
    updatePreset(state, updatePreset) {
      // Actualiza el preset en el estado con los nuevos datos
      state.Presets = state.Presets.filter(({ id }) => id !== updatePreset);
    },

       //Orders
       setOrders(state, payload) {
        state.Orders = payload;
      },
   
      addOrders(state, payload) {
        state.Orders.push(payload);
      },
      deleteOrders(state, orderId) {
        state.Orders = state.Orders.filter(order => order.id !== orderId);
      },
    ordersTotal(state, total) {
    state.ordersTotal = total;
  },

  setPagos(state, total) {
    state.Pagos = total;
  },
    
  pagosTotal(state, payload) {
    state.Pagos.push(payload);
  },

//Eventos
  setEventos(state, payload) {
    state.Eventos = payload;
  },
  deleteEventos(state, id) {
    state.Eventos = state.Eventos.filter(eventos => eventos.id !== id);
  },
  updateEventos(state, updateEventos) {
    // Actualiza el usuario en el estado con los nuevos datos
    state.Eventos = state.Eventos.filter(({ id }) => id !== updateEventos);
  },
 
  addEventos(state, payload) {
    state.Eventos.push(payload);
  },
  //Reservas
  setReservas(state, payload) {
    state.Reservas = payload;
  },
  addReservas(state, payload) {
    state.Reservas.push(payload);
  },
setReservasID(state, reservas) {
  // Asegúrate de que 'reservas' sea un array antes de asignarlo al estado
  state.Reservas = Array.isArray(reservas) ? reservas : [];
},
updateReservas(state, updateReservas) {
  // Actualiza el usuario en el estado con los nuevos datos
  state.Reservas = state.Reservas.filter(({ id }) => id !== updateReservas);
},

  },
  actions: {


    // LOGIN
    login({ commit }, payload) {
      console.log(`payload ${JSON.stringify(payload)}`);
      // fetch
      if (payload.username === 'admin' && payload.password === 'admin') {
        commit('setAuthenticated');
        commit('setRole', 'admin');
        return true;
      }
      if (payload.username === 'andrea' && payload.password === 'andrea') {
        commit('setAuthenticated');
        commit('setRole', 'userAndrea');
        return true;
      }
      return false;
    },   // Al inicializar la tienda, cargar la información de autenticación desde localStorage
    initializeStore({ commit }) {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const role = localStorage.getItem('role') || '';

      if (isAuthenticated) {
        commit('setAuthenticated');
        commit('setRole', role);
      }
    }, 
    // Logout
    
  logout({ commit }) {
    // Verifica si ya estás en la ruta de logout antes de navegar
    if (router.currentRoute.path !== '/') {
      router.push('/').catch(() => {});
    }

    commit('logout');
    // Puedes agregar lógica adicional aquí si es necesario
  },



  
    // Fetch de Usuarios
    fetchUsuarios({ commit }) {
      fetch('https://localhost:7043/Usuarios')
        .then(response => response.json())
        .then(data => {
          console.log('Datos recibidos de la API:', data);
          commit('setUsuarios', data);
        })
        .catch(error => {
          console.error('Error fetching Usuarios:', error);
        });
    },
 // Post de Usuarios
 addUsuarios({ commit }, usuariosañadidos) {
  fetch('https://localhost:7043/Usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuariosañadidos),
  })
 
  .then(data => {
    // Llama a la mutación solo después de asegurarte de que la solicitud fue exitosa
    commit('addUsuarios', data);
  })
 
},
updateUsuarios({ commit }, Usuarios) {
  fetch(`https://localhost:7043/Usuarios/${Usuarios.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Usuarios),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Check if response is not empty before trying to parse JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        // If the response is not JSON or empty, return an empty object
        return {};
      }
    })
    .then(data => {
      // Actualiza el usuario en el estado con los nuevos datos
      commit('updateUsuarios', data);
    })
    .catch(error => {
      console.error('Error updating user:', error);
      throw error; // Rethrow the error for the component to handle
    });
},





deleteUsuarios({ commit }, id) {
   fetch('https://localhost:7043/Usuarios' + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // The DELETE method may not return a body, so we don't attempt to parse it
      // Assuming a successful delete, we can commit the mutation
      commit('deleteUsuarios', id);
    })
    .catch(error => {
      console.error('Error deleting user:', error);
      throw error; // Rethrow the error for the component to handle
    });
},
usuariosSocios({ commit }) {
  fetch(`https://localhost:7043/Usuarios/socios?esSocio=${true}`)
    .then((result) => result.json())
    .then((data) => {
      console.log('Usuarios Socios:', data);
      commit('setUsuarios', data);
    })
    .catch((error) => {
      console.error('Error obteniendo usuarios socios:', error);
    });
},
usuariosSociosFalse({ commit }) {
  fetch(`https://localhost:7043/Usuarios/socios?esSocio=${false}`)
    .then((result) => result.json())
    .then((data) => {
      console.log('Usuarios No Socios:', data);
      commit('setUsuarios', data);
    })
    .catch((error) => {
      console.error('Error obteniendo usuarios no socios:', error);
    });
},
fetchUsuariosName({ commit }, name) {
  fetch(`https://localhost:7043/Usuarios/GetByName?name=${name}`)
    .then(result => result.json())
    .then(data => {
      console.log('Usuarios name:', data);
      commit('setUsuarios', data);
    })
    .catch(error => {
      console.error('Error fetching users by name:', error);
    });
},

    // Fetch de Likes
    addLikes({ commit }, likeInfo) {
      fetch('https://localhost:7043/Likes', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(likeInfo),
      })
        .then(result => result.json())
        .then(data => commit('addLike', data));
    },



    //Testimonios 
    fetchTestimonios({ commit }) {
      fetch('https://localhost:7043/Testimonios')
        .then(result => result.json())
        .then(data => commit('setTestimonios', data));
    },
    // Post de Testimonios
    addTestimonios({ commit }, testimoniosInfo) {
      fetch('https://localhost:7043/Testimonios', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(testimoniosInfo),
      })
        .then(result => result.json())
        .then(data => commit('addTestimonios', testimoniosInfo));
    },
    // Delete de Testimonios
    deleteTestimonios({ commit }, id) {
      fetch('https://localhost:7043/Testimonios' + `/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(result => result.json())
        .then(data => {
          commit('deleteTestimonios', id);
        });
            //Buscar por nombre
   

    },
    searchTestimonios({ commit }, datePost) {
      fetch('https://localhost:7043/Testimonios/fecha?datePost=' + `${datePost}`)


        .then(result => result.json())

        .then(data => commit('setTestimonios', data))
      commit('setTestimonios', datePost)
    },



//Presets

    fetchPresets({ commit }) {
      console.log('Fetching Presets...');
      fetch('https://localhost:7043/Presets')
        .then(result => result.json())
        .then(data => commit('setPresets', data));
    },
    // Post de Presets
    addPresets({ commit }, presetsInfo) {
      fetch('https://localhost:7043/Presets', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(presetsInfo),
      })
        .then(result => result.json())
        .then(data => commit('addPresets', data));
    },
    
    deletePresets({ commit }, id) {
      return fetch('https://localhost:7043/Presets' + `/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // The DELETE method may not return a body, so we don't attempt to parse it
          // Assuming a successful delete, we can commit the mutation
          commit('deletePresets', id);
        })
        .catch(error => {
          console.error('Error deleting preset:', error);
          throw error; // Rethrow the error for the component to handle
        });
    },
    
    
    presetPrecioDesc({ commit }) {
      return fetch(`https://localhost:7043/Presets/precio?sortOrder=desc`)
        .then((result) => result.json())
        .then((data) => {
          console.log('Presets after sorting:', data);
          commit('presetFilters', data);
        })
        .catch((error) => {
          console.error('Error sorting presets by price descending:', error);
        });
    },
    
    presetPrecioAsc({ commit }) {
      return fetch(`https://localhost:7043/Presets/precio?sortOrder=asc`)
        .then((result) => result.json())
        .then((data) => {
          console.log('Presets after sorting:', data);
          commit('presetFilters', data);
        })
        .catch((error) => {
          console.error('Error sorting presets by price ascending:', error);
        });
    },
    
    updatePreset({ commit }, Presets) {
      fetch(`https://localhost:7043/Presets/${Presets.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Presets),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          // Check if response is not empty before trying to parse JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return response.json();
          } else {
            // If the response is not JSON or empty, return an empty object
            return {};
          }
        })
        .then(data => {
          // Actualiza el preset en el estado con los nuevos datos
          commit('updatePreset', data);
        })
        .catch(error => {
          console.error('Error updating user:', error);
          throw error; // Rethrow the error for the component to handle
        });
    },
    
    

//Orders

fetchOrders({ commit }) {
  console.log('Fetching Orders...');
  fetch('https://localhost:7043/Order')
    .then(result => result.json())
    .then(data => commit('setOrders', data));
},
// Post de Orders
addOrders({ commit }, ordersInfo) {
  fetch('https://localhost:7043/Order', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(ordersInfo),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => commit('addOrders', data))
    .catch(error => console.error("Error al realizar la compra:", error));
},
deleteOrders({ commit, dispatch }, id) {
  fetch('https://localhost:7043/Order' + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
    .then(result => {
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      // La solicitud DELETE puede no devolver un cuerpo JSON válido, por lo que no intentamos analizarlo
      return result.text();
    })
    .then(() => {
      commit('deleteOrders', id);
      // Después de eliminar la orden, vuelve a cargar las órdenes actualizadas
      dispatch('fetchOrders');
    })
    .catch(error => {
      console.error('Error deleting order:', error);
    });




},


ordersTotal({ commit }) {
  console.log('Fetching Orders...');
  fetch('https://localhost:7043/Order/sum')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => commit('ordersTotal', data) )
  .catch(error => {
    console.error('Error fetching Orders SUM:', error);
  });
},


fetchPagos({ commit }) {
  console.log('Fetching pagos...');
  fetch('https://localhost:7043/Pagos')
    .then(result => result.json())
    .then(data => commit('setPagos', data));
},

pagosTotal({ commit }, pagosTotal) {
  fetch('https://localhost:7043/Pagos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pagosTotal),
  })
 
  .then(data => {
    // Llama a la mutación solo después de asegurarte de que la solicitud fue exitosa
    commit('pagosTotal', data);
  })
 
},

fetchEventos({ commit }) {
  fetch('https://localhost:7043/Eventos')
    .then(response => response.json())
    .then(data => {
      console.log('Datos recibidos de la API:', data);
      commit('setEventos', data);
    })
    .catch(error => {
      console.error('Error fetching Eventos:', error);
    });
},
// Post de Eventos
addEventos({ commit }, eventosañadidos) {
fetch('https://localhost:7043/Eventos', {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify(eventosañadidos),
})

.then(data => {
// Llama a la mutación solo después de asegurarte de que la solicitud fue exitosa
commit('addEventos', data);
})

},

deleteEventos({ commit, dispatch }, id) {
  fetch('https://localhost:7043/Eventos' + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
    .then(result => {
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      // La solicitud DELETE puede no devolver un cuerpo JSON válido, por lo que no intentamos analizarlo
      return result.text();
    })
    .then(() => {
      commit('deleteEventos', id);
      // Después de eliminar la orden, vuelve a cargar las órdenes actualizadas
      dispatch('fetchEventos');
    })
    .catch(error => {
      console.error('Error deleting order:', error);
    });


},
updateEventos({ commit }, Eventos) {
  fetch(`https://localhost:7043/Eventos/${Eventos.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Eventos),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Check if response is not empty before trying to parse JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        // If the response is not JSON or empty, return an empty object
        return {};
      }
    })
    .then(data => {
      // Actualiza el usuario en el estado con los nuevos datos
      commit('updateEventos', data);
    })
    .catch(error => {
      console.error('Error updating evento:', error);
      throw error; // Rethrow the error for the component to handle
    });
},



fetchReservas({ commit }) {
  fetch('https://localhost:7043/Reservas')
    .then(response => response.json())
    .then(data => {
      console.log('Datos recibidos de la API:', data);
      commit('setReservas', data);
    })
    .catch(error => {
      console.error('Error fetching Reservas:', error);
    });
},
// Post de Reservas
addReservas({ commit }, nuevaReserva) {
  return fetch('https://localhost:7043/Reservas', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(nuevaReserva),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      commit('addReservas', data);  // Asumiendo que tienes una mutación para agregar reservas
      return data;  // Devuelve la respuesta para que pueda ser utilizada en el componente
    })
    .catch(error => {
      console.error('Error al agregar la reserva:', error);
      throw error;  // Propaga el error para que pueda ser manejado en el componente
    });
},

// En tu archivo de vuex, en la sección de actions
fetchReservasId({ commit }, { eventoId, fecha }) {
  return new Promise((resolve, reject) => {
    fetch(`https://localhost:7043/Reservas/${eventoId}/${fecha}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al obtener las reservas para el evento ${eventoId} y la fecha ${fecha}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos recibidos de la API:', data);
        commit('setReservasID', data);
        resolve(data); // Resuelve la promesa con los datos recibidos
      })
      .catch(error => {
        console.error('Error al obtener las reservas:', error);
        reject(error); // Rechaza la promesa con el error
      });
  });


},

updateReservas({ commit }, Reservas) {
  fetch(`https://localhost:7043/Reservas/${Reservas.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Reservas),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Check if response is not empty before trying to parse JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      } else {
        // If the response is not JSON or empty, return an empty object
        return {};
      }
    })
    .then(data => {
      // Actualiza el usuario en el estado con los nuevos datos
      commit('updateReservas', data);
    })
    .catch(error => {
      console.error('Error updating Reservas:', error);
      throw error; // Rethrow the error for the component to handle
    });
},


  },
  modules: {},
});
