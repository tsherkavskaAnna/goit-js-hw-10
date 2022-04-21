 export function fetchCountries(name) {
      return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
    };

