import { Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function MonstreVictorieux() {

    /**
     * Le nom du monstre victorieux
     */
    const [nomMonstre, setNomMonstre] = useState("");

    /**
     * Le nombre de victimes du monstre victorieux
     */
    const [nombreVictimes, setNombreVictimes] = useState(0);

    /**
     * Trouve le monstre victorieux
     */
    useEffect(() => {
        axios.get("https://donjonmonstresapi.netlify.app/monstre/mortel").then((reponse) => {
            if(reponse.data.erreur !== null && reponse.data.erreur !== undefined) {
                alert("Une erreur s'est produite lors de l'affichage du monstre le plus victorieux");
                console.error(reponse.data.erreur);
            }
            else {
                setNomMonstre(reponse.data.nomMonstre);
                setNombreVictimes(reponse.data.nombreVictimes);
            }
        });
    }, []);

    return (
        <>
            <Paper elevation={5}>
                <Stack padding={4} width={460}>
                    <Typography variant="h5">Le monstre le plus victorieux</Typography>
                    <Typography>{nomMonstre}</Typography>
                    <Typography>{"avec " + nombreVictimes + " victimes à son actif"}</Typography>
                </Stack>
            </Paper>
        </>
    )
}

export default MonstreVictorieux;