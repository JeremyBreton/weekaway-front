import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // mt: 20,
        height: '50vh',
        color: '#ABD1C6',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;

// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// import React, { useState, useEffect } from 'react'; // Importez useState et useEffect

// function Loading() {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Utilisez useEffect pour gérer le timeout
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 3000);

//     // Assurez-vous de nettoyer le timer lorsque le composant est démonté
//     return () => {
//       clearTimeout(timer);
//     };
//   }, []); // Le tableau vide [] signifie que ce code s'exécutera une seule fois après le rendu initial

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           mt: 20,
//           color: '#ABD1C6',
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }
// }

// export default Loading;
