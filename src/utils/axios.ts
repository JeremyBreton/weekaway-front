/*
  Je crée une instance Axios :
  le moyen d'utiliser Axios avec une configuration personnalisée
  et prédéfinie
*/

import axios from 'axios';

export default axios.create({
  baseURL: 'http://87.106.123.203:3000/api',
});
