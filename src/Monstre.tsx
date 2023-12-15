import React, { useEffect, useState } from "react";
import { DonjonContext } from "./App";
import { IDonjonContext } from "./modeles/IDonjonContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IRace } from "./modeles/IRace";
import { Button, Dialog, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { IMonstre } from "./modeles/IMonstre";
import { DataGrid, GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";

function Monstre() {

    /**
     * La navigation
     */
    const navigate = useNavigate();

    const [modificationActivee, setModification] = useState(false);
    
    /**
     * Récupère les informations nécéssaires du contexte
     */
    const { modifierMonstre, retirerMonstre, races, monstres } = React.useContext(DonjonContext) as IDonjonContext;

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
                setRowSelectionModelAmis(reponse.data.monstre.amisId.map((id : String) => {return id.toString()}))
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
    const handleChangerRace = (event: SelectChangeEvent<String>) => {
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
     * Les rangées pour le tableau d'amis
     */
    const amiRows : GridRowsProp = monstres.filter((amiPossible) => monstre?.amisId.includes(amiPossible._id)).map((monstre) => {return {id: monstre._id, nom : monstre.nom, niveau : monstre.niveau}});

    /**
     * Les races sous un format qui peut peupler la combobox
     */
    const itemsRaces = races.map((race) => <MenuItem key={race._id.valueOf()} value={race._id.valueOf()}>{race.nom}</MenuItem>);

    /**
     * Les colones pour le tableau d'amis
     */
    const amiColumns = [
        { field: 'nom', headerName: 'Nom', width: 700 },
        { field: 'niveau', headerName: 'Niveau', width: 100 },
      ];


    /**
     * Assigne le niveau du monstre lors de la modification du niveau
     */
    const handleNiveauChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const niveauNombre = parseInt(event.target.value, 10);

        if(!isNaN(niveauNombre))
            setMonstre({ ...monstre!, niveau: niveauNombre})
    }

    /**
     * Assigne l'âge du monstre lors de la modification da l'âge
     */
    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ageNombre = parseInt(event.target.value, 10);

        if(!isNaN(ageNombre))
            setMonstre({ ...monstre!, age : ageNombre})
    }

    /**
     * Les rangées pour le tableau d'aventuriers
     */
    const aventuriersRows : GridRowsProp | undefined = monstre?.aventuriersVaincus.map((aventurier) => {return {id: aventurier.nom + aventurier.rang + aventurier.classe, nom : aventurier.nom, niveau : aventurier.niveau, rang : aventurier.rang, classe : aventurier.classe}});

    /**
     * Les colones pour le tableau d'aventuriers
     */
    const aventuriersColumns = [
        { field: 'nom', headerName: 'Nom', width: 300 },
        { field: 'niveau', headerName: 'Niveau', width: 100 },
        { field: 'classe', headerName: 'Classe', width: 200 },
        { field: 'rang', headerName: 'Rang', width: 200 }
      ];

    /**
     * Gère le changement de la liste d'amis
     * @param nouvelleListeAmis la nouvelle liste d'amis
     */
    const handleSelectionAmisChange = (nouvelleListeAmis : GridRowSelectionModel) => {
        setRowSelectionModelAmis(nouvelleListeAmis);

        const ids = nouvelleListeAmis.map((id) => id.toString());
        setMonstre({ ...monstre!, amisId: ids});
    }

    /**
     * Indique à la grille quels amis sont sélectionnés
     */
    const [rowSelectionModelAmis, setRowSelectionModelAmis] = React.useState<GridRowSelectionModel>([]);

    /**
     * Les rangées pour le tableau d'amis
     */
    const amiPossiblesRows : GridRowsProp = monstres.map((monstre) => {return {id: monstre._id, nom : monstre.nom, niveau : monstre.niveau}});

    /**
     * Les colones pour le tableau d'amis
     */
    const amiPossiblesColumns = [
        { field: 'nom', headerName: 'Nom', width: 300 },
        { field: 'niveau', headerName: 'Niveau', width: 100 },
      ];

    return (
        <>
            <Typography variant="h2">{monstre?.nom}</Typography>
            <span>&nbsp;</span>
            <Stack spacing={3}>
                <NavLink to="/Monstre">Retour aux monstres</NavLink>

                <Typography textAlign="start">{"race : " + race?.nom}</Typography>
                <Typography textAlign="start">{"niveau : " + monstre?.niveau}</Typography>
                <Typography textAlign="start">{"age : " + monstre?.age}</Typography>
                <Typography textAlign="start">{"date de naissance : " + (monstre ? (monstre?.dateNaissance.toString()).split('T')[0] : "Date inconnue")}</Typography>
                
                { monstre !== null && monstre.amisId.length > 0 ?
                <Stack>
                    <Typography textAlign="start">Amis du monstre</Typography>
                    <div style={{ height: 300, width: '100%' }}>
                        <DataGrid rows={amiRows} columns={amiColumns}/>
                    </div>
                </Stack>
                :
                <Typography textAlign="start">Ce monstre n'a aucun ami</Typography>
                }

                { monstre !== null && monstre.aventuriersVaincus.length > 0 ?
                <Stack>
                    <Typography textAlign="start">Aventuriers vaincus par le monstre</Typography>
                    { aventuriersRows !== undefined && <div style={{ height: 300, width: '100%' }}>
                        <DataGrid rows={aventuriersRows!} columns={aventuriersColumns}/>
                    </div>
                    }
                </Stack>
                :
                <Typography textAlign="start">Ce monstre n'a vaincu aucun aventurier</Typography>
                }

                <Button onClick={handleModifierMontre}>Modifier</Button>
                <Button onClick={handleSupprimerMonstre}>Supprimer</Button>
            </Stack>
            { modificationActivee && 
                <Stack spacing={5} paddingTop={10}>
                <FormControl>
                    <TextField id="nom-monstre" helperText="Nom du monstre" required={true} fullWidth={true} variant="filled" onChange={handleNomChange} value={monstre?.nom}/> 
                </FormControl>
                <FormControl>
                <InputLabel id="race">Race</InputLabel>
                    <Select labelId="race" id="race-select" value={race?._id} label="Race" onChange={handleChangerRace}>
                        {itemsRaces}
                    </Select>
                </FormControl>
                <FormControl>
                    <TextField id="niveau-monstre" helperText="Niveau du monstre" required={true} type="number" variant="filled" onChange={handleNiveauChange} value={monstre?.niveau}/> 
                </FormControl>
                <FormControl>
                    <TextField id="age-monstre" helperText="Âge du monstre" required={true} type="number" variant="filled" onChange={handleAgeChange} value={monstre?.age}/> 
                </FormControl>
                <Stack>
                    <Typography textAlign="start">Amis du monstre</Typography>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid checkboxSelection onRowSelectionModelChange={handleSelectionAmisChange} rows={amiPossiblesRows} columns={amiPossiblesColumns} rowSelectionModel={rowSelectionModelAmis}/>
                    </div>
                </Stack>
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