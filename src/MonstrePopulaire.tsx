import { Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function MonstrePopulaire() {

    /**
     * Le nom du monstre populaire
     */
    const [nomMonstre, setNomMonstre] = useState("");

    /**
     * Le nombre d'amis du monstre populaire
     */
    const [nombreAmis, setNombreAmis] = useState(0);

    /**
     * Trouve le monstre populaire
     */
    useEffect(() => {
        axios.get("https://donjonmonstresapi.netlify.app/monstre/amical").then((reponse) => {
            if(reponse.data.erreur !== null && reponse.data.erreur !== undefined) {
                alert("Une erreur s'est produite lors de l'affichage du monstre le plus populaire");
                console.error(reponse.data.erreur);
            }
            else {
                setNomMonstre(reponse.data.nomMonstre);
                setNombreAmis(reponse.data.nombreAmis);
            }
        });
    }, []);

    return (
        <>
            <Paper elevation={5}>
                <Stack padding={4} width={460}>
                    <Typography variant="h5">Le monstre le plus populaire</Typography>
                    <Typography>{nomMonstre}</Typography>
                    <Typography>{"avec " + nombreAmis + " amis à son actif"}</Typography>
                </Stack>
            </Paper>
        </>
    )
}

export default MonstrePopulaire;