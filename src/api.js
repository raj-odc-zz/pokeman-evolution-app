const baseServerUrl = 'https://pokeapi.co/api/v2';
export default {
  getAllSpecies: () => {
    return fetch(`${baseServerUrl}/pokemon-species`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .catch(error => console.error('Error:', error));
  },

  getSpeciesInfo: (params) => {
    return fetch(`${params.url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .catch(error => console.error('Error:', error));
  },

  getSpeciesEvolution: (params) => {
    return fetch(`${params.url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .catch(error => console.error('Error:', error));
  },

}