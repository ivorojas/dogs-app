import axios from "axios";

export const getDogs = () => {
  return async function (dispatch) {
    try {
      let json = await axios.get("https://dogs-app-api.onrender.com/dogs");
      /*    let json = await axios.get("http://localhost:3001/dogs");*/
      return dispatch({
        type: "GET_DOGS",
        payload: json.data,
      });
    } catch (error) {
      console.log("error en el getdogs actions");
    }
  };
};

export const getTemperaments = () => {
  return async function (dispatch) {
    try {
      let json = await axios.get("https://dogs-app-api.onrender.com/temperaments");
      /*      let json = await axios.get("http://localhost:3001/temperaments");*/
      //console.log(json.data);
      return dispatch({
        type: "GET_TEMPERAMENTS",
        payload: json.data,
      });
    } catch (error) {
      console.log("error en el getTemperaments actions");
    }
  };
};


export const getDogByName = (name) => {
  return async function (dispatch) {
    try {
      console.log('get dog by name se ejecutó')
      console.log(name)
      let json = await axios.get(`https://dogs-app-api.onrender.com/dogs?name=` + name);
      /*      let json = await axios.get(`http://localhost:3001/dogs?name=` + name);*/
      console.log(json)
      return dispatch({
        type: "GET_NAME_DOG",
        payload: json.data,
      });
    } catch (error) {
      console.log("error en getDogByName");
    }
  };
};

/*
export const getDogByName = (name) => {
  return async function (dispatch) {
    try {
      console.log('get dog by name se ejecutó')
      console.log(name)
      let json = await axios.get(`http://localhost:3001/dogs/:` + name);
      //console.log(json)
      return dispatch({
        type: "GET_NAME_DOG",
        payload: json.data,
      });
    } catch (error) {
      console.log("error en getDogByName");
    }
  };
};
*/

export const postDog = (payload) => {
  return async function (dispatch) {
    try {
      let response = await axios.post("https://dogs-app-api.onrender.com/dogs", payload);
      /*   let response = await axios.post("http://localhost:3001/dogs", payload);*/
      return response;
    } catch (error) {
      console.log("error en el psotDog");
    }
  };
};

export const filterDogsByTemperaments = (payload) => {
  try {
    //console.log(payload);
    return {
      type: "FILTER_BY_TEMPERAMENTS",
      payload,
    };
  } catch (error) {
    console.log("error en el filterTemperaments actions");
  }
};

export function filterBreeds(payload) {
  try {
    return {
      type: "FILTER_BREEDS",
      payload,
    };
  } catch (error) {
    console.log("error en filter breeds");
  }
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}

export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      let json = await axios.get("https://dogs-app-api.onrender.com/dogs/" + id);
      /*     let json = await axios.get("http://localhost:3001/dogs/" + id);*/
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log("error en el getDetails");
    }
  };
};
