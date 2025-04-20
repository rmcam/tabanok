# Paleta de Colores Tailwind CSS para la Revitalización de la Lengua Kamëntšá

## 🌈 **Colores Base (500)**

| Nombre (ES) | Término Kamëntšá | Hex       | Significado Cultural                               |
| ----------- | ---------------- | --------- | -------------------------------------------------- |
| Negro       | `btseˊnga`       | `#1A1A1A` | Protección, Tierra, Autoridad                      |
| Blanco      | `bxaˊntse`       | `#FFFFFF` | Pureza, Claridad, Nuevos Comienzos                 |
| Rojo        | `buaˊngana`      | `#D62828` | Sol (Shinÿe), Vida, Energía, Historia              |
| Verde       | `ngɨˊbʃna`       | `#3A8E5A` | Naturaleza, Crecimiento, Territorio (Madre Tierra) |
| Amarillo    | `tsɨɕijaˊna`     | `#FCA311` | Vitalidad, Alegría, Energía Solar                  |
| Azul        | —                | `#0077B6` | Prosperidad (símbolo rana), Espiritualidad (yagé)  |

---

## 🎨 **Escalas de Variantes (50-900)**

### Configuración en `tailwind.config.js`

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Convención: Prefijo 'k-' + nombre en español
        'k-negro': {
          50: '#E8E8E8',
          100: '#D1D1D1',
          200: '#A3A3A3',
          300: '#757575',
          400: '#474747',
          500: '#1A1A1A',
          600: '#141414',
          700: '#0F0F0F',
          800: '#0A0A0A',
          900: '#050505',
        },
        'k-blanco': {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#FFFFFF',
          600: '#F5F5F5',
          700: '#EBEBEB',
          800: '#DCDCDC',
          900: '#C2C2C2',
        },
        'k-rojo': {
          50: '#FEEAEA',
          100: '#FDD8D8',
          200: '#FAB3B3',
          300: '#F78D8D',
          400: '#F15A5A',
          500: '#D62828',
          600: '#B81D1D',
          700: '#9A1515',
          800: '#7C0E0E',
          900: '#5E0909',
        },
        'k-verde': {
          50: '#EDF6F0',
          100: '#D9EDDB',
          200: '#B6DAB7',
          300: '#92C893',
          400: '#6DB570',
          500: '#3A8E5A',
          600: '#2E784A',
          700: '#235E3A',
          800: '#17452B',
          900: '#0C2C1B',
        },
        'k-amarillo': {
          50: '#FEF6E7',
          100: '#FDECCF',
          200: '#FCD9A0',
          300: '#FBC570',
          400: '#FAB240',
          500: '#FCA311',
          600: '#D9860B',
          700: '#B66A07',
          800: '#934F04',
          900: '#703702',
        },
        'k-azul': {
          50: '#E0F2F9',
          100: '#B3E1F2',
          200: '#80CEEB',
          300: '#4DBAE4',
          400: '#1AA7DD',
          500: '#0077B6',
          600: '#006399',
          700: '#004F7D',
          800: '#003B60',
          900: '#002744',
        },
      },
    },
  },
};
```

---

Última actualización: 20/4/2025, 2:00:00 a. m. (America/Bogota, UTC-5:00)
