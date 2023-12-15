import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import Acceuil from './Acceuil';
import { IElement } from './modeles/IElement';
import { IRace } from './modeles/IRace';
import { IMonstre } from './modeles/IMonstre';
import { IDonjonContext } from './modeles/IDonjonContext';
import ListeElements from './ListeElements';
import Element from './Element';
import ListeRace from './ListeRace';
import ListeMonstre from './ListeMonstre';
import Race from './Race';
import AjouterElement from './AjouterElement';
import { CssBaseline } from '@mui/material';
import AjouterRace from './AjouterRace';
import Monstre from './Monstre';
import AjouterMonstre from './AjouterMonstre';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Constexte du donjon, contient tous les informations du donjon
 */
export const DonjonContext = React.createContext<IDonjonContext | null>(null);

/**
 * Application qui gère un donjon de monstres
 */
function App() {

  /**
   * La liste des éléments
   */
  const [elements, setElements] = useState<IElement[]>([]);

  /**
   * Ajoute un élément à la liste d'éléments
   * @param element l'élément à ajouter
   * @returns true si l'élément à été ajouté
   */
  const ajouterElement = async (element : IElement) => {

    return axios.post("https://donjonmonstresapi.netlify.app/element/ajouter",
      {
        "element" : {
          "nom" : element.nom
        }
      }).then((resultat) => {
        if(resultat.data.erreur !== null && resultat.data.erreur !== undefined) {
          console.error(resultat.data.erreur);
          return false;
        }

        var copieElements = [...elements];
        copieElements?.push(resultat.data.element);
        setElements(copieElements);
        return true;

      }).catch((erreur) => {
        console.error(erreur);
        return false;
      })

  }

  /**
   * Modifie un élément dans le tableau d'éléments
   * @param element l'élément à modifier
   * @returns si oui ou non l'élément à été modifié
   */
  const modifierElement = (element : IElement) => {

    return axios.put("https://donjonmonstresapi.netlify.app/element/miseAJour",
    {
      "element" : {
        "_id" : element._id,
        "nom" : element.nom
      }
    }).then((reponse) => {
      if(reponse.data.erreur !== null && reponse.data.erreur !== undefined) {
        console.error(reponse.data.erreur);
        return false;
      }

      const elementAModifier = elements.find(elementDuTableau => elementDuTableau._id == element._id);

      if(elementAModifier === undefined)
        return false; // Élément non trouvé
  
      const nouveauElements = elements?.filter(elementDuTableau => elementDuTableau._id !== element._id);
      nouveauElements?.push(element);
      setElements(nouveauElements);
  
      return true
    }).catch((erreur) => {
      console.error(erreur);
      return false;
    });
  }

  /**
   * Retire un élément de la liste d'éléments
   * @param element l'élément à retirer
   * @returns si oui ou non l'élément à été retiré
   */
  const retirerElement = (element : IElement) => {

    return axios.delete("https://donjonmonstresapi.netlify.app/element/supression/" + element._id)
    .then((resultat) => {
      if(resultat.data.erreur !== null && resultat.data.erreur !== undefined) {
        console.error(resultat.data.erreur);
        return false;
      }

      const nouveauElements = elements?.filter(elementDeTableau => elementDeTableau._id !== element._id);

      if (nouveauElements && nouveauElements.length !== elements.length) {
        setElements(nouveauElements);
        return true; // L'élément a été retiré avec succès
      } else {
        return false; // L'élément n'a pas été trouvé dans la liste
      }

    }).catch((erreur) => {
        console.error(erreur);
        return false;
    });
  }

  /**
   * La liste des races
   */
  const [races, setRaces] = useState<IRace[]>([]);

  /**
   * Ajoute une race à la liste de races
   * @param race la race à ajouter
   * @returns true si la race à été ajouté
   */
  const ajouterRace = (race : IRace) => {
    return axios.post("https://donjonmonstresapi.netlify.app/race/ajouter",
      {
        "race" : {
          "nom" : race.nom,
          "elementId" : race.elementId,
          "reproductionAsexuelle" : race.reproductionAsexuelle
        }
      }).then((resultat) => {
        if(resultat.data.erreur !== null && resultat.data.erreur !== undefined) {
          console.error(resultat.data.erreur);
          return false;
        }

        var copieRaces = [...races];
        copieRaces?.push(resultat.data.race);
        setRaces(copieRaces);
        return true;

      }).catch((erreur) => {
        console.error(erreur);
        return false;
      })
  }

  /**
   * Modifie une race dans le tableau de races
   * @param race la race à modifier
   * @returns si oui ou non la race à été modifié
   */
  const modifierRace = (race : IRace) => {
    
    return axios.put("https://donjonmonstresapi.netlify.app/race/miseAJour",
    {
      "race" : {
        "_id" : race._id,
        "nom" : race.nom,
        "elementId" : race.elementId,
        "reproductionAsexuelle" : race.reproductionAsexuelle
      }
    }).then((reponse) => {
      if(reponse.data.erreur !== null && reponse.data.erreur !== undefined) {
        console.error(reponse.data.erreur);
        return false;
      }

      const raceAModifier = races.find(raceDuTableau => raceDuTableau._id == race._id);

      if(raceAModifier === undefined)
        return false; // Race non trouvé
  
      const nouveauRaces = races?.filter(raceDuTableau => raceDuTableau._id !== race._id);
      nouveauRaces?.push(race);
      setRaces(nouveauRaces);
  
      return true
    }).catch((erreur) => {
      console.error(erreur);
      return false;
    });
  }

  /**
   * Retire une race de la liste de races
   * @param race la race à retirer
   * @returns si oui ou non la race à été retiré
   */
  const retirerRace = (race : IRace) => {
    
    return axios.delete("https://donjonmonstresapi.netlify.app/race/supression/" + race._id)
    .then((resultat) => {
      if(resultat.data.erreur !== null && resultat.data.erreur !== undefined) {
        console.error(resultat.data.erreur);
        return false;
      }

      const nouveauRaces = races?.filter(raceDuTableau => raceDuTableau._id !== race._id);

      if (nouveauRaces && nouveauRaces.length !== elements.length) {
        setRaces(nouveauRaces);
        return true; // La race a été retiré avec succès
      } else {
        return false; // La race n'a pas été trouvé dans la liste
      }
    }).catch((erreur) => {
        console.error(erreur);
        return false;
    });
  }

  /**
   * La liste des monstres
   */
  const [monstres, setMonstres] = useState<IMonstre[]>([]);

  /**
   * Ajoute un monstre à la liste de monstres
   * @param monstre le monstre à ajouter
   * @returns true si le monstre à été ajouté
   */
  const ajouterMonstre = (monstre : IMonstre) => {
    
  console.log(monstre.amisId);

    return axios.post("https://donjonmonstresapi.netlify.app/monstre/ajouter",
      {
        "monstre" : {
          "nom" : monstre.nom,
          "raceId" : monstre.raceId,
          "niveau" : monstre.niveau,
          "age" : monstre.age,
          "amisId" : monstre.amisId,
          "dateNaissance" : monstre.dateNaissance,
          "aventuriersVaincus" : monstre.aventuriersVaincus
        }
      }).then((resultat) => {
        if(resultat.data.erreur !== null && resultat.data.erreur !== undefined) {
          console.error(resultat.data.erreur);
          return false;
        }

        var copieMonstres = [...monstres];
        copieMonstres?.push(resultat.data.monstre);
        setMonstres(copieMonstres);
        return true;

      }).catch((erreur) => {
        console.error(erreur);
        return false;
      })

  }

  /**
   * Modifie un monstre dans le tableau de monstres
   * @param monstre le monstre à modifier
   * @returns si oui ou non le monstre à été modifié
   */
  const modifierMonstre = (monstre : IMonstre) => {
    
    return axios.put("https://donjonmonstresapi.netlify.app/monstre/miseAJour",
    {
      "monstre" : {
        "_id" : monstre._id,
        "nom" : monstre.nom,
        "raceId" : monstre.raceId,
        "niveau" : monstre.niveau,
        "age" : monstre.age,
        "amisId" : monstre.amisId,
        "dateNaissance" : monstre.dateNaissance,
        "aventuriersVaincus" : monstre.aventuriersVaincus
      }
    }).then((reponse) => {
      if(reponse.data.erreur !== null && reponse.data.erreur !== undefined) {
        console.error(reponse.data.erreur);
        return false;
      }

      const monstreAModifier = monstres.find(monstreDuTableau => monstreDuTableau._id == monstre._id);

      if(monstreAModifier === undefined)
        return false; // Monstre non trouvé
  
      const nouveauMonstres = monstres?.filter(monstreDuTableau => monstreDuTableau._id !== monstre._id);
      nouveauMonstres?.push(monstre);
      setMonstres(nouveauMonstres);
  
      return true;

    }).catch((erreur) => {
      console.error(erreur);
      return false;
    });
  }

  /**
   * Retire un monstre de la liste de monstres
   * @param monstre le monstre à retirer
   * @returns si oui ou non le monstre à été retiré
   */
  const retirerMonstre = (monstre : IMonstre) => {
    
    return axios.delete("https://donjonmonstresapi.netlify.app/monstre/supression/" + monstre._id)
    .then((resultat) => {
      if(resultat.data.erreur !== null && resultat.data.erreur !== undefined) {
        console.error(resultat.data.erreur);
        return false;
      }

      const nouveauMonstres = monstres?.filter(monstreDuTableau => monstreDuTableau._id !== monstre._id);

      if (nouveauMonstres && nouveauMonstres.length !== monstres.length) {
        setMonstres(nouveauMonstres);
        return true; // Le monstre a été retiré avec succès
      } else {
        return false; // Le monstre n'a pas été trouvé dans la liste
      }

    }).catch((erreur) => {
        console.error(erreur);
        return false;
    });
  }

  /**
   * Au démmarage, peuple les tableaux avec les informations de l'api
   */
  useEffect(() => {
    axios.get('https://donjonmonstresapi.netlify.app/element').then((reponse) => {
      setElements(reponse.data.elements);
    });

    axios.get('https://donjonmonstresapi.netlify.app/race').then((reponse) => {
      setRaces(reponse.data.races);
    });

    axios.get('https://donjonmonstresapi.netlify.app/monstre').then((reponse) => {
      setMonstres(reponse.data.monstres);
    });
  }, []);

  return (
    <DonjonContext.Provider value={{
      elements : elements,
      races : races,
      monstres : monstres,
      ajouterElement : ajouterElement,
      modifierElement : modifierElement,
      retirerElement : retirerElement,
      ajouterRace : ajouterRace,
      modifierRace : modifierRace,
      retirerRace : retirerRace,
      ajouterMonstre : ajouterMonstre,
      modifierMonstre : modifierMonstre,
      retirerMonstre : retirerMonstre
    }}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" Component={Acceuil} />
          <Route path="/Element" Component={ListeElements}/>
          <Route path="/Element/:idElement" Component={Element}/>
          <Route path="/Element/Ajouter" Component={AjouterElement}/>
          <Route path="/Race" Component={ListeRace}/>
          <Route path="/Race/:idRace" Component={Race}/>
          <Route path="/Race/Ajouter" Component={AjouterRace}/>
          <Route path="/Monstre" Component={ListeMonstre}/>
          <Route path="/Monstre/:idMonstre" Component={Monstre}/>
          <Route path="/Monstre/Ajouter" Component={AjouterMonstre}/>
        </Routes>
      </BrowserRouter>
    </DonjonContext.Provider>
  )
}

export default App
