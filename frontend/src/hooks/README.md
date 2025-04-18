# useUnits Hook

Este hook se encarga de obtener una lista de unidades desde la API.

## Funcionalidad

- Realiza una petición GET a `/unity` para obtener un array de objetos `Unity`.
- Maneja el estado de carga (`loading`) mostrando `true` mientras se realiza la petición.
- Maneja los errores (`error`), mostrando un mensaje descriptivo en caso de fallo.
- Solo realiza la petición si el usuario está autenticado (`isAuthenticated`).

## Uso

```typescript
import useUnits from './useUnits';

const MyComponent = () => {
  const { units, loading, error } = useUnits();

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {units.map((unit) => (
        <li key={unit.id}>{unit.name}</li>
      ))}
    </ul>
  );
};
```

## Interfaz `Unity`

```typescript
export interface Unity {
  id: string;
  name: string;
  description: string;
  // Agrega aquí otros campos de la entidad Unity
}
```

## Dependencias

- `axios`: Para realizar la petición a la API.
- `react`: Para usar los hooks `useEffect` y `useState`.
- `api`:  Módulo que contiene la configuración de la API.
- `useAuth`: Hook de autenticación.
