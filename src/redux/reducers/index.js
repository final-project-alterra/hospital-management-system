import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import admin from './admin';
import main from './main';
import auth from './auth';
import doctor from './doctor';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [''],
};

const adminPersistConfig = {
  key: 'admin',
  storage: storage,  
};

const mainPersistConfig = {
  key: 'main',
  storage: storage,  
};

const authPersistConfig = {
  key: 'auth',
  storage: storage,  
};

const doctorPersistConfig = {
  key: 'doctor',
  storage: storage,  
};

const rootReducer = combineReducers({  
  main: persistReducer(mainPersistConfig, main),    
  admin: persistReducer(adminPersistConfig, admin),
  doctor: persistReducer(doctorPersistConfig, doctor),    
  auth: persistReducer(authPersistConfig, auth),    
});

export default persistReducer(rootPersistConfig, rootReducer);
