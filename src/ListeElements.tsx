import React from "react"
import { DonjonContext } from "./App"
import { IDonjonContext } from "./modeles/IDonjonContext"
import { Divider, Stack, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"

function ListeElements() {

    /**
     * Récupère les informations nécéssaires du contexte
     */
    const { elements } = React.useContext(DonjonContext) as IDonjonContext

    const elementItems = elements
        .slice()
        .sort((premier, deuxieme) => premier.nom.localeCompare(deuxieme.nom.valueOf()))
        .map((element) => 
            <NavLink 
                key={element._id.valueOf()} 
                to={"/Element/" + element._id}>
                    <Typography textAlign="left">{element.nom}</Typography>
            </NavLink>);

    return (
        <>
            <Typography variant="h3">Liste des éléments</Typography>
            <Stack direction="row" spacing={20} padding={1} justifyContent="center">
                <NavLink to="/">Retour à l'Acceuil</NavLink>
                <NavLink to="/Element/Ajouter">Ajouter</NavLink>
            </Stack>
            <span>&nbsp;</span>
            <Typography variant="h6" textAlign="left">Éléments</Typography>
            <Stack spacing={1} direction="column" divider={<Divider orientation="horizontal" flexItem />} paddingTop={3} width={500}>
                {elementItems}
            </Stack>
        </>
    )
}

export default ListeElements