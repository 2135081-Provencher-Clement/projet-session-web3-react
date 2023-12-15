import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { DonjonContext } from "./App";
import { IDonjonContext } from "./modeles/IDonjonContext";
import React from "react";

function AjouterRace() {

    /**
     * Récupère les informations nécéssaires du contexte
     */
    const {ajouterRace, elements} = React.useContext(DonjonContext) as IDonjonContext;

    /**
     * Le nom de la race
     */
    const [nomRace, setNom] = useState("");

    /**
     * l'identifiant de l'élément de la race
     */
    const [elementId, setElementId] = useState<String>("");

    /**
     * Si la reproduction de la race est asexuelle
     */
    const [reproductionAsexuelle, setReproduction] = useState<boolean>(false);

    /**
     * Assigne le nom de l'élément lors de la modification du nom
     */
    const handleNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value);
    }

    /**
     * Ajoute la race
     */
    const handleAjouterRace = async () => {
        const resultat = await ajouterRace({
             _id : "" , 
             nom : nomRace, 
             elementId : elementId!, 
             reproductionAsexuelle : reproductionAsexuelle 
        });

        if (resultat) {
            alert("La race à été ajouté avec succès");
            setNom("");
            setReproduction(false);
        }
        else {
            alert("Une erreur est survenue lors de l'ajout de la race");
        }
    }

    /**
     * Change l'élément lors d'un changement de sélection du combobox
     */
    const handleChangerElement = (event: SelectChangeEvent<String>) => {
        setElementId(event.target.value);
    }

    /**
     * Change la reproductio nlors d'un changement du switch
     */
    const handleChangerReproduction = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReproduction(event.target.checked);
    }

    /**
     * Les éléments sous un format qui peut peupler la combobox
     */
    const itemsElement = elements.map((element) => <MenuItem key={element._id.valueOf()} value={element._id.valueOf()}>{element.nom}</MenuItem>)

    return (
        <>
            <Typography variant="h2">Ajouter une race</Typography>
            <span>&nbsp;</span>
            <NavLink to="/Race">Retour aux races</NavLink>
            <Stack spacing={5} paddingTop={10}>
                <FormControl>
                    <TextField id="nom-race" helperText="Nom de la race" required={true} fullWidth={true} variant="filled" onChange={handleNomChange} value={nomRace}/> 
                </FormControl>
                <FormControl>
                    <InputLabel id="element">Élément</InputLabel>
                    <Select labelId="element" id="element-select" value={elementId} label="Élément" onChange={handleChangerElement}>
                        {itemsElement}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormControlLabel control={
                        <Switch checked={reproductionAsexuelle} onChange={handleChangerReproduction}/>
                    } label="Reproduction asexuelle" />
                </FormControl>
                <Button onClick={handleAjouterRace}>Ajouter</Button>
            </Stack>
            
        </>
    );
}

export default AjouterRace;