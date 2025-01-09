let initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_DOGS":
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
        };
      case "GET_TEMPERAMENTS":
        return {
          ...state,
          temperaments: action.payload,
        };
      case "GET_NAME_DOG":
        return {
          ...state,
          dogs: action.payload,
        };
      case "GET_DETAILS":
        return {
          ...state,
          detail: action.payload,
        };
      case "POST_DOG":
        return {
          ...state,
        };
      case "FILTER_BY_TEMPERAMENTS":
        const allDogs = state.allDogs;
        let stateFiltered = [];
  
        if (action.payload === "todos-los-temperamentos") {
          stateFiltered = [...allDogs];
        } else {
          allDogs.forEach((dog) => {
            if (dog.temperament !== undefined) {
              if (dog.temperament.includes(action.payload)) {
                stateFiltered.push(dog);
              }
            }
          });
        }
        //console.log(stateFiltered);
        return {
          ...state,
          dogs: stateFiltered,
        };
      case "FILTER_BREEDS":
        const allBreeds = state.allDogs;
        const filteredBreeds =
          action.payload === "todos-los-perros"
            ? allBreeds
            : action.payload === "api"
            ? allBreeds.filter((b) => b.created === false)
            : allBreeds.filter((b) => b.created === true);
        return {
          ...state,
          dogs: filteredBreeds,
        };
      case "ORDER_BY_NAME":
        let orderByName = [...state.dogs];
        if (action.payload === "a-z") {
          orderByName = orderByName.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
              return -1;
            }
            return 0;
          });
        } else {
          orderByName = orderByName.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          });
        }
        return {
          ...state,
          dogs: orderByName,
        };
      case "ORDER_BY_WEIGHT":
        let orderByWeight = [...state.allDogs];
        //console.log(orderByWeight);
        orderByWeight =
          action.payload === "menor-peso"
            ? orderByWeight.sort((a, b) => {
                return Number(a.weight_min) - Number(b.weight_min);
              })
            : orderByWeight.sort((a, b) => {
                return Number(b.weight_min) - Number(a.weight_min);
              });
        return {
          ...state,
          dogs: orderByWeight,
        };
      default:
        return state;
    }
  }
  
  export default rootReducer;
  