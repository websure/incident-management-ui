/*
  Api methods for Videos
*/
import Api from '../../services/Api';

const IncidentApi = {
  getIncidentDetails: (id) => Api.get(`/incident/${id}`),
  getIncidentList: (params) => Api.post('/incident/', params),
};

export default IncidentApi;
