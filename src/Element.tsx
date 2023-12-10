import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { IElement } from "./modeles/IElement";
import { Button, Card, Dialog, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { DonjonContext } from "./App";
import { IDonjonContext } from "./modeles/IDonjonContext";
import React from "react";

function Element() {

    /**
     * Récupère les informations nécéssaires du contexte
     */
    const { modifierElement, retirerElement } = React.useContext(DonjonContext) as IDonjonContext;

    const [modificationActivee, setModification] = useState(false);

    /**
     * indique si le message de confirmation de suppression est ouvert
     */
    const [dialogConfirmationSuppressionOuvert, setDialogConfirmationSuppressionOuvert] = useState(false);

    /**
     * La navigation
     */
    const navigate = useNavigate();

    /**
     * L'id de l'élément
     */
    const { idElement } = useParams()

    /**
     * Le nom de l'élément
     */
    const [nomElement, setNomElement] = useState<String>("");

    /**
     * Récupère l'élément au premier chargement
     */
    useEffect(() => {
        axios.get("https://donjonmonstresapi.netlify.app/element/id/" + idElement).then((reponse) => {
            setNomElement(reponse.data.nom);
        }).catch((erreur) => {
            alert("Une erreur s'est produite lors de l'affichage de l'élément");
            console.error(erreur);
        })
    }, []);

    /**
     * Affiche le formulaire de modification
     */
    const handleModifierElement = () => {
        setModification(true);
    }

    /**
     * Affiche le message de confirmation de suppression
     */
    const handleSupprimerElement = () => {
        setDialogConfirmationSuppressionOuvert(true);
    }

    /**
     * Supprime l'élément
     */
    const traitementSupprimerElement = async () => {
        setDialogConfirmationSuppressionOuvert(false);
        const resultat = await retirerElement({ _id: idElement?.valueOf()!, nom : nomElement});
        console.log(resultat);
        if(resultat) {
            navigate("/Element");
        }
        else {
            alert("Il y a eu une erreur lors de la suppression");
        }
    }

    const traitementModifierElement = async () => {
        const resultat = await modifierElement({ _id : idElement!, nom : nomElement});

        if(resultat) {
            alert("L'élément à été modifié avec succès");
        } else {
            alert("une erreur s'est produite lors de la modifiaction et l'élément n'a pu être modifié");
        }
    }

    /**
     * Assigne le nom de l'élément lors de la modification du nom
     */
    const handleNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNomElement(event.target.value);
    }

    return (
        <>
            <Typography variant="h2">{nomElement}</Typography>
            <span>&nbsp;</span>
            <Stack spacing={3}>
                <NavLink to="/Element">Retour aux éléments</NavLink>
                <Button onClick={handleModifierElement}>Modifier</Button>
                <Button onClick={handleSupprimerElement}>Supprimer</Button>
            </Stack>
            <Dialog open={dialogConfirmationSuppressionOuvert}>
                <Typography sx={{padding : 5}}>Êtes-vous certain de vouloir supprimer cet élément ?
                Tous les races de cet éléments seront aussi supprimés
                et tous les monstres de ces races seront, eux aussi, supprimés !</Typography>
                <Stack direction="row" justifyContent="center" sx={{padding : 2}}>
                    <Button onClick={() => {setDialogConfirmationSuppressionOuvert(false);}}>Non</Button>
                    <Button onClick={traitementSupprimerElement}>Oui</Button>
                </Stack>
            </Dialog>
            { modificationActivee ?
                <Stack padding={5} spacing={2}>
                    <Typography variant="h4">Modifier</Typography>
                    <TextField id="nom-element" helperText="Nom de l'élément" required={true} fullWidth={true} variant="filled" onChange={handleNomChange} value={nomElement}/> 
                    <Button onClick={traitementModifierElement}>Modifier</Button>
                </Stack>   
            : null } 
        </>
    );
}

export default Element