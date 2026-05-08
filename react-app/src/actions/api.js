import axios from 'axios';
import { dCandidate } from '../reducers/dCandidate';

const baseURL = 'https://localhost:44344/api/';

export default {
    dCandidate(url = baseURL + 'DCandidate/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
}