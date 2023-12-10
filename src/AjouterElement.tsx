import { Button, Stack, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { DonjonContext } from "./App";
import React, { useState } from "react";
import { IDonjonContext } from "./modeles/IDonjonContext";

function AjouterElement() {

    const { ajouterElement } = React.useContext(DonjonContext) as IDonjonContext

    const [nomElement, setNom] = useState("");

    /**
     * Ajoute un élément
     */
    const handleAjouterElement = async () => {
        const resultat = await ajouterElement({ _id : "" , nom : nomElement });

        if (resultat) {
            alert("L'élément à été ajouté avec succès");
            setNom("");
        }
        else {
            alert("Une erreur est survenue lors de l'ajout de l'élément");
        }
    };

    /**
     * Assigne le nom de l'élément lors de la modification du nom
     */
    const handleNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value);
    }

    return (
        <>
            <Typography variant="h2">Ajouter un élément</Typography>
            <span>&nbsp;</span>
            <NavLink to="/Element">Retour aux éléments</NavLink>
            <Stack spacing={5} paddingTop={10}>
                <TextField id="nom-element" helperText="Nom de l'élément" required={true} fullWidth={true} variant="filled" onChange={handleNomChange} value={nomElement}/> 
                <Button onClick={handleAjouterElement}>Ajouter</Button>
            </Stack>
            
        </>
    );
}

export default AjouterElement;