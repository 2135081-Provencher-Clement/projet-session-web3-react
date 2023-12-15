import React, { useEffect, useState } from "react";
import { DonjonContext } from "./App";
import { IDonjonContext } from "./modeles/IDonjonContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IRace } from "./modeles/IRace";
import { Button, Dialog, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch, TextField, Typography } from "@mui/material";

function Race() {

    /**
     * La navigation
     */
    const navigate = useNavigate();

    const [modificationActivee, setModification] = useState(false);
    
    /**
         * Récupère les informations nécéssaires du contexte
         */
    const { modifierRace, retirerRace, elements } = React.useContext(DonjonContext) as IDonjonContext;

    /**
     * Indique si le message de confirmation de suppression est ouvert
     */
    const [dialogConfirmationSuppressionOuvert, setDialogConfirmationSuppressionOuvert] = useState(false);

    /**
     * L'id de la race
     */
    const { idRace } = useParams()

    /**
     * La race
     */
    const [race, setRace] = useState<IRace | null>(null);

    /**
     * L'élément de la race
     */
    const [element, setElement] = useState<String>("");

    /**
     * Récupère la race et son élément au premier chargement
     */
    useEffect(() => {
        axios.get("https://donjonmonstresapi.netlify.app/race/id/" + idRace).then((reponse) => {
            if(reponse.data.erreur !== null && reponse.data.erreur !== undefined) {
                alert("Une erreur s'est produite lors de l'affichage de la race");
                console.error(reponse.data.erreur);
            }
            else    
            {
                setRace(reponse.data.race);
                axios.get("https://donjonmonstresapi.netlify.app/element/id/" + reponse.data.race.elementId).then((reponseElement) => {
                    if(reponseElement.data.erreur !== null && reponseElement.data.erreur !== undefined) {
                        alert("Une erreur s'est produite lors de l'affichage de la race");
                        console.error(reponseElement.data.erreur);
                    } else {
                        setElement(reponseElement.data.nom);
                    }
                });
            }
        }).catch((erreur) => {
            alert("Une erreur s'est produite lors de l'affichage de la race");
            console.error(erreur);
        });
    }, []);

    

    /**
     * Affiche le formulaire de modification
     */
    const handleModifierRace = () => {
        setModification(true);
    }

    /**
     * modifie la race
     */
    const traitementModifierRace = async () => {
        if(race === null)
            return

        const resultat = await modifierRace(race);

        if(resultat) {
            alert("La race à été modifié avec succès");
        } else {
            alert("une erreur s'est produite lors de la modifiaction et la race n'a pu être modifié");
    }
    }

    /**
     * Affiche le message de confirmation de suppression
     */
    const handleSupprimerRace = () => {
        setDialogConfirmationSuppressionOuvert(true);
    }

    /**
     * Supprime la race
     */
    const traitementSupprimerRace = async () => {
        if (race === null)
            return;

        setDialogConfirmationSuppressionOuvert(false);
        const resultat = await retirerRace(race);

        if(resultat)
            navigate("/Race");
        else {
            alert("Il y a eu une erreur lors de la suppression");
        }
    }

    /**
     * Change l'élément lors d'un changement de sélection du combobox
     */
    const handleChangerElement = (event: SelectChangeEvent<String>) => {
        if(race === undefined)
            return;

        setRace({...race!, elementId : event.target.value});

        axios.get("https://donjonmonstresapi.netlify.app/element/id/" + event.target.value).then((reponseElement) => {
            if(reponseElement.data.erreur !== null && reponseElement.data.erreur !== undefined) {
                alert("Une erreur s'est produite lors de l'affichage de la race");
                console.error(reponseElement.data.erreur);
            } else {
                setElement(reponseElement.data.nom);
            }
        });
    }

     /**
     * Assigne le nom de la race lors de la modification du nom
     */
     const handleNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(race === undefined)
            return;

        setRace({...race!, nom : event.target.value});
    }

    /**
     * Change la reproduction lors d'un changement du switch
     */
    const handleChangerReproduction = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(race === undefined)
            return;
        
        setRace({...race!, reproductionAsexuelle : event.target.checked});
    }

    /**
     * Les éléments sous un format qui peut peupler la combobox
     */
    const itemsElement = elements.map((element) => <MenuItem key={element._id.valueOf()} value={element._id.valueOf()}>{element.nom}</MenuItem>)

    return (
        <>
            <Typography variant="h2">{race?.nom}</Typography>
            <span>&nbsp;</span>
            <Stack spacing={3}>
                <NavLink to="/Race">Retour aux races</NavLink>

                <Typography textAlign="start">{"élément : " + element}</Typography>
                <Typography textAlign="start">{"reporoduction asexuelle : " + (race?.reproductionAsexuelle ? "oui" : "non") }</Typography>

                <Button onClick={handleModifierRace}>Modifier</Button>
                <Button onClick={handleSupprimerRace}>Supprimer</Button>
            </Stack>
            { modificationActivee && 
                <Stack spacing={5} paddingTop={10}>
                    <Typography variant="h4">Modifier</Typography>
                    <FormControl>
                        <TextField id="nom-race" helperText="Nom de la race" required={true} fullWidth={true} variant="filled" onChange={handleNomChange} value={race?.nom}/> 
                    </FormControl>
                    <FormControl>
                        <InputLabel id="element">Élément</InputLabel>
                        <Select labelId="element" id="element-select" value={race?.elementId} label="Élément" onChange={handleChangerElement}>
                            {itemsElement}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormControlLabel control={
                            <Switch checked={race!.reproductionAsexuelle.valueOf()} onChange={handleChangerReproduction}/>
                        } label="Reproduction asexuelle" />
                    </FormControl>
                    <Button onClick={traitementModifierRace}>Modifier</Button>
                </Stack>
            }
            <Dialog open={dialogConfirmationSuppressionOuvert}>
                <Typography sx={{padding : 5}}>Êtes-vous certain de vouloir supprimer cette race ?
                Tous les monstres de cette race seront, eux aussi, supprimés !</Typography>
                <Stack direction="row" justifyContent="center" sx={{padding : 2}}>
                    <Button onClick={() => {setDialogConfirmationSuppressionOuvert(false);}}>Non</Button>
                    <Button onClick={traitementSupprimerRace}>Oui</Button>
                </Stack>
            </Dialog>
        </>
    );
}

export default Race;