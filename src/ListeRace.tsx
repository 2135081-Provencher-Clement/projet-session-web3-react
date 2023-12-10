import { Divider, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { DonjonContext } from "./App";
import React from "react";
import { IDonjonContext } from "./modeles/IDonjonContext";

function ListeRace() {

     /**
     * Récupère les informations nécéssaires du contexte
     */
     const { races } = React.useContext(DonjonContext) as IDonjonContext

     const raceItems = races
        .slice()
        .sort((premier, deuxieme) => premier.nom.localeCompare(deuxieme.nom.valueOf()))
        .map((race) => 
            <NavLink 
                key={race._id.valueOf()} 
                to={"/Race/" + race._id}>
                    <Typography textAlign="left">{race.nom}</Typography>
            </NavLink>);


    return (
        <>
            <Typography variant="h3">Liste des races</Typography>
            <Stack direction="row" spacing={20} padding={1} justifyContent="center">
                <NavLink to="/">Retour à l'Acceuil</NavLink>
                <NavLink to="/Race/Ajouter">Ajouter</NavLink>
            </Stack>
            <span>&nbsp;</span>
            <Typography variant="h6" textAlign="left">Races</Typography>
            <Stack spacing={1} direction="column" divider={<Divider orientation="horizontal" flexItem />} paddingTop={2}>
                {raceItems}
            </Stack>
        </>
    );
}

export default ListeRace;