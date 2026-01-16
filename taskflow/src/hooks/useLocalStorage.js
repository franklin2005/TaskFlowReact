import { useEffect, useState } from "react";
/*
    Hook para usar localStorage como estado reactivo
    key: clave en localStorage
    initialValue: valor inicial si no hay nada en localStorage
*/ 
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });
  // Guarda en localStorage cada vez que cambia el estado
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // si localStorage falla no rompemos la app
    }
  }, [key, value]);
  // Devuelve el estado y la función para actualizarlo
  return [value, setValue];
}
