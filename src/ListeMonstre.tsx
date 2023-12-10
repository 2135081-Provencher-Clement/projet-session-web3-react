import React from "react";
import { DonjonContext } from "./App";
import { NavLink } from "react-router-dom";
import { Divider, Stack, Typography } from "@mui/material";
import { IDonjonContext } from "./modeles/IDonjonContext";

function ListeMonstre() {

    /**
     * Récupère les informations nécéssaires du contexte
     */
    const { monstres } = React.useContext(DonjonContext) as IDonjonContext

    const monstreItems = monstres
        .slice()
        .sort((premier, deuxieme) => premier.nom.localeCompare(deuxieme.nom.valueOf()))
        .map((monstre) => 
            <NavLink 
                key={monstre._id.valueOf()} 
                to={"/Monstre/" + monstre._id}>
                    <Typography textAlign="left">{monstre.nom}</Typography>
            </NavLink>);


   return (
       <>
           <Typography variant="h3">Liste des monstres</Typography>
           <Stack direction="row" spacing={20} padding={1} justifyContent="center">
               <NavLink to="/">Retour à l'Acceuil</NavLink>
               <NavLink to="/Element/Ajouter">Ajouter</NavLink>
           </Stack>
           <span>&nbsp;</span>
           <Typography variant="h6" textAlign="left">Monstres</Typography>
           <Stack spacing={1} direction="column" divider={<Divider orientation="horizontal" flexItem />} paddingTop={3} width={500}>
               {monstreItems}
           </Stack>
       </>
   );
}

export default ListeMonstre;