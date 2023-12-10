import { Divider, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

function Acceuil() {

    // Trouvé le span bizarre ici : https://stackoverflow.com/questions/46656476/rendering-empty-space-in-react
    return(
        <Stack alignSelf="flex-start">
            <Typography variant="h2">Bienvenue dans le donjon de monstres</Typography>
            <Typography>Choississez ce que vous voulez voir</Typography>
            <span>&nbsp;</span>
            <Stack direction="row" spacing={5} justifyContent="center" divider={<Divider orientation='vertical' flexItem/>}>
                <NavLink to="/Monstre">Monstres</NavLink>
                <NavLink to="/Race">Races</NavLink>
                <NavLink to="/Element">Éléments</NavLink>
            </Stack>
        </Stack>
    )
}

export default Acceuil