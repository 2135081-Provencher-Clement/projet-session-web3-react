import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { DonjonContext } from "./App";
import { IDonjonContext } from "./modeles/IDonjonContext";
import React from "react";
import DatePicker from 'react-datepicker';
import { DataGrid, GridRowSelectionModel, GridRowsProp } from '@mui/x-data-grid';


function AjouterMonstre() {

    /**
     * Récupère les informations nécéssaires du contexte
     */
    const {ajouterMonstre, races, monstres} = React.useContext(DonjonContext) as IDonjonContext;

    /**
     * Le nom du monstre
     */
    const [nomMonstre, setNom] = useState("");

    /**
     * l'identifiant de la race du monstre
     */
    const [raceId, setRaceId] = useState<String>("");

    /**
     * Le niveau du monstre
     */
    const [niveau, setNiveau] = useState(1);

    /**
     * L'age du monstre
     */
    const [age, setAge] = useState(1);

    /**
     * La liste des amis du monstre
     */
    const [amis, setAmis] = useState<String[]>([]);

    /**
     * La date de naissance du monstre
     */
    const [dateNaissance, setDateNaissance] = useState( new Date());

    /**
     * Assigne le nom de la race lors de la modification du nom
     */
    const handleNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value);
    }

    /**
     * Ajoute le monstre
     */
    const handleAjouterMonstre = async () => {

        const resultat = await ajouterMonstre({
             _id : "" , 
             nom : nomMonstre, 
             raceId : raceId!, 
             niveau : niveau,
             age : age,
             amisId : amis,
             dateNaissance : dateNaissance,
             aventuriersVaincus : []
        });

        if (resultat) {
            alert("Le monstre à été ajouté avec succès");
            setNom("");
            setNiveau(1);
            setAge(1);
            setAmis([]);
            setDateNaissance(new Date());
        }
        else {
            alert("Une erreur est survenue lors de l'ajout du monstre");
        }
    }

    /**
     * Change la race lors d'un changement de sélection du combobox
     */
    const handleChangerRace = (event: SelectChangeEvent<String>) => {
        setRaceId(event.target.value);
    }

    /**
     * Assigne le niveau du monstre lors de la modification du niveau
     */
    const handleNiveauChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const niveauNombre = parseInt(event.target.value, 10);

        if(!isNaN(niveauNombre))
            setNiveau(niveauNombre);
    }

    /**
     * Assigne l'âge du monstre lors de la modification da l'âge
     */
    const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ageNombre = parseInt(event.target.value, 10);

        if(!isNaN(ageNombre))
            setAge(ageNombre);
    }

    /**
     * Change la date lors d'un changement dans le datePicker
     */
    const handleDateChange = (date: Date) => {
        setDateNaissance(date);
    };

    /**
     * Les races sous un format qui peut peupler la combobox
     */
    const itemsRaces = races.map((race) => <MenuItem key={race._id.valueOf()} value={race._id.valueOf()}>{race.nom}</MenuItem>);

    /**
     * Les rangées pour le tableau d'amis
     */
    const amiRows : GridRowsProp = monstres.map((monstre) => {return {id: monstre._id, nom : monstre.nom, niveau : monstre.niveau}});

    /**
     * Les colones pour le tableau d'amis
     */
    const amiColumns = [
        { field: 'nom', headerName: 'Nom', width: 300 },
        { field: 'niveau', headerName: 'Niveau', width: 100 },
      ];

    /**
     * Gère le changement de la liste d'amis
     * @param nouvelleListeAmis la nouvelle liste d'amis
     */
    const handleSelectionAmisChange = (nouvelleListeAmis : GridRowSelectionModel) => {

        const ids = nouvelleListeAmis.map((id) => id.toString());
        setAmis(ids);
    }

    return (
        <>
            <Typography variant="h2">Ajouter un monstre</Typography>
            <span>&nbsp;</span>
            <NavLink to="/Monstre">Retour aux monstres</NavLink>
            <Stack spacing={5} paddingTop={10}>
                <FormControl>
                    <TextField id="nom-monstre" helperText="Nom du monstre" required={true} fullWidth={true} variant="filled" onChange={handleNomChange} value={nomMonstre}/> 
                </FormControl>
                <FormControl>
                    <InputLabel id="race">Race</InputLabel>
                    <Select labelId="race" id="race-select" value={raceId} label="Race" onChange={handleChangerRace}>
                        {itemsRaces}
                    </Select>
                </FormControl>
                <FormControl>
                    <TextField id="niveau-monstre" helperText="Niveau du monstre" required={true} type="number" variant="filled" onChange={handleNiveauChange} value={niveau}/> 
                </FormControl>
                <FormControl>
                    <TextField id="age-monstre" helperText="Âge du monstre" required={true} type="number" variant="filled" onChange={handleAgeChange} value={age}/> 
                </FormControl>
                <Stack textAlign="start">
                    <Typography>Date de naissance du monstre</Typography>
                    <DatePicker selected={dateNaissance} onChange={handleDateChange}/>
                </Stack>
                <Stack>
                    <Typography textAlign="start">Amis du monstre</Typography>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid checkboxSelection onRowSelectionModelChange={handleSelectionAmisChange} rows={amiRows} columns={amiColumns}/>
                    </div>
                </Stack>
                <Button onClick={handleAjouterMonstre}>Ajouter</Button>
            </Stack>
            
        </>
    );
}

export default AjouterMonstre;