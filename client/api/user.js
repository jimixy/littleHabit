import axios from './index'

export const register = data => axios.post('/v1/token')(data)
export const login = data => axios.post('/v1/token')(data)
export const getAllHabit = data => axios.get('/v1/habit')(data)

