import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [shifts, setShifts] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [shiftsData, professionalsData, sectorsData, exchangesData] = await Promise.all([
        api.getShifts().catch(() => []),
        api.getProfessionals().catch(() => []),
        api.getSectors().catch(() => []),
        api.getExchanges().catch(() => []),
      ]);
      
      setShifts(Array.isArray(shiftsData) ? shiftsData : []);
      setProfessionals(Array.isArray(professionalsData) ? professionalsData : []);
      setSectors(Array.isArray(sectorsData) ? sectorsData : []);
      setExchanges(Array.isArray(exchangesData) ? exchangesData : []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function addShift(shift) {
    try {
      const newShift = await api.createShift(shift);
      setShifts(prev => [...prev, newShift]);
      return newShift;
    } catch (error) {
      console.error('Error creating shift:', error);
      throw error;
    }
  }

  async function addProfessional(professional) {
    try {
      const newProfessional = await api.createProfessional(professional);
      setProfessionals(prev => [...prev, newProfessional]);
      return newProfessional;
    } catch (error) {
      console.error('Error creating professional:', error);
      throw error;
    }
  }

  async function requestExchange(exchange) {
    try {
      const newExchange = await api.createExchange(exchange);
      setExchanges(prev => [...prev, newExchange]);
      return newExchange;
    } catch (error) {
      console.error('Error creating exchange:', error);
      throw error;
    }
  }

  return (
    <AppContext.Provider value={{
      shifts,
      professionals,
      sectors,
      exchanges,
      loading,
      addShift,
      addProfessional,
      requestExchange,
      refreshData: loadData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
