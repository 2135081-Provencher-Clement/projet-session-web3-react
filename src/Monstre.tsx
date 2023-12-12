import React, { useEffect, useState } from "react";
import { DonjonContext } from "./App";
import { IDonjonContext } from "./modeles/IDonjonContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IRace } from "./modeles/IRace";
import { Button, Dialog, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch, TextField, Typography } from "@mui/material";
import { IMonstre } from "./modeles/IMonstre";

function Monstre() {

    /**
     * La navigation
     */
    const navigate = useNavigate();

    const [modificationActivee, setModification] = useState(false);
    
    /**
     * Récupère les informations nécéssaires du contexte
     */
    const { modifierMonstre, retirerMonstre, races } = React.useContext(DonjonContext) as IDonjonContext;

    /**
     * Indique si le message de confirmation de suppression est ouvert
     */
    const [dialogConfirmationSuppressionOuvert, setDialogConfirmationSuppressionOuvert] = useState(false);

    /**
     * L'id du monstre
     */
    const { idMonstre } = useParams()

    /**
     * Le monstre
     */
    const [monstre, setMonstre] = useState<IMonstre | null>(null);

    /**
     * La race du monstre
     */
    const [race, setRace] = useState<IRace | null>(null);

    /**
     * Récupère le monstre et sa race au premier chargement
     */
    useEffect(() => {
        axios.get("https://donjonmonstresapi.netlify.app/monstre/id/" + idMonstre).then((reponse) => {
            if(reponse.data.erreur !== null && reponse.data.erreur !== undefined) {
                alert("Une erreur s'est produite lors de l'affichage du monstre");
                console.error(reponse.data.erreur);
            }
            else    
            {
                setMonstre(reponse.data.monstre);
                axios.get("https://donjonmonstresapi.netlify.app/race/id/" + reponse.data.monstre.raceId).then((reponseRace) => {
                    if(reponseRace.data.erreur !== null && reponseRace.data.erreur !== undefined) {
                        alert("Une erreur s'est produite lors de l'affichage du monstre");
                        console.error(reponseRace.data.erreur);
                    } else {
                        setRace(reponseRace.data.race);
                    }
                });
            }
        }).catch((erreur) => {
            alert("Une erreur s'est produite lors de l'affichage du monstre");
            console.error(erreur);
        });
    }, []);

    

    /**
     * Affiche le formulaire de modification
     */
    const handleModifierMontre = () => {
        setModification(true);
    }

    /**
     * modifie le monstre
     */
    const traitementModifierMonstre = async () => {
        if(monstre === null)
            return

        const resultat = await modifierMonstre(monstre);

        if(resultat) {
            alert("Le monstre à été modifié avec succès");
        } else {
            alert("une erreur s'est produite lors de la modifiaction et le monstre n'a pu être modifié");
    }
    }

    /**
     * Affiche le message de confirmation de suppression
     */
    const handleSupprimerMonstre = () => {
        setDialogConfirmationSuppressionOuvert(true);
    }

    /**
     * Supprime le monstre
     */
    const traitementSupprimerMonstre = async () => {
        if (monstre === null)
            return;

        setDialogConfirmationSuppressionOuvert(false);
        const resultat = await retirerMonstre(monstre);

        if(resultat)
            navigate("/Monstre");
        else {
            alert("Il y a eu une erreur lors de la suppression");
        }
    }

    /**
     * Change la race lors d'un changement de sélection du combobox
     */
    const handleChangerRace = (event: SelectChangeEvent<String>, child: React.ReactNode) => {
        if(monstre === undefined)
            return;

        setMonstre({...monstre!, raceId : event.target.value});

        axios.get("https://donjonmonstresapi.netlify.app/element/id/" + event.target.value).then((reponseRace) => {
            if(reponseRace.data.erreur !== null && reponseRace.data.erreur !== undefined) {
                alert("Une erreur s'est produite lors de l'affichage du monstre");
                console.error(reponseRace.data.erreur);
            } else {
                setRace(reponseRace.data.race);
            }
        });
    }

     /**
     * Assigne le nom du monstre lors de la modification du nom
     */
     const handleNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(race === undefined)
            return;

        setMonstre({...monstre!, nom : event.target.value});
    }


    /**
     * Les éléments sous un format qui peut peupler la combobox
     */
    const itemsElement = races.map((race) => <MenuItem key={race._id.valueOf()} value={race._id.valueOf()}>{race.nom}</MenuItem>)

    return (
        <>
            <Typography variant="h2">{monstre?.nom}</Typography>
            <span>&nbsp;</span>
            <Stack spacing={3}>
                <NavLink to="/Monstre">Retour aux monstres</NavLink>

                <Typography textAlign="start">{"race : " + race?.nom}</Typography>

                <Button onClick={handleModifierMontre}>Modifier</Button>
                <Button onClick={handleSupprimerMonstre}>Supprimer</Button>
            </Stack>
            { modificationActivee && 
                <Stack spacing={5} paddingTop={10}>
                    <Typography variant="h4">Modifier</Typography>
                    <FormControl>
                        <TextField id="nom-monstre" helperText="Nom du monstre" required={true} fullWidth={true} variant="filled" onChange={handleNomChange} value={monstre?.nom}/> 
                    </FormControl>
                    <FormControl>
                        <InputLabel id="race">Race</InputLabel>
                        <Select labelId="race" id="race-select" value={monstre?.raceId} label="Race" onChange={handleChangerRace}>
                            {itemsElement}
                        </Select>
                    </FormControl>
                    <Button onClick={traitementModifierMonstre}>Modifier</Button>
                </Stack>
            }
            <Dialog open={dialogConfirmationSuppressionOuvert}>
                <Typography sx={{padding : 5}}>Êtes-vous certain de vouloir supprimer ce monstre ?</Typography>
                <Stack direction="row" justifyContent="center" sx={{padding : 2}}>
                    <Button onClick={() => {setDialogConfirmationSuppressionOuvert(false);}}>Non</Button>
                    <Button onClick={traitementSupprimerMonstre}>Oui</Button>
                </Stack>
            </Dialog>
        </>
    );
}

export default Monstre;