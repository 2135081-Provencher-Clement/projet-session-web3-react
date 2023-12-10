import { IElement } from "./IElement";
import { IMonstre } from "./IMonstre";
import { IRace } from "./IRace";

/**
 * Type de données du contexte de donjon
 */
export interface IDonjonContext {
    elements : IElement[];
    races : IRace[];
    monstres : IMonstre[];
    ajouterElement : (element : IElement) => Promise<boolean>;
    modifierElement : (element : IElement) => Promise<boolean>;
    retirerElement : (element : IElement) => Promise<boolean>;
    ajouterRace : (race : IRace) => Promise<boolean>;
    modifierRace : (race : IRace) => Promise<boolean>;
    retirerRace : (race : IRace) => Promise<boolean>;
    ajouterMonstre : (monstre : IMonstre) => Promise<boolean>;
    modifierMonstre : (monstre : IMonstre) => Promise<boolean>;
    retirerMonstre : (monstre : IMonstre) => Promise<boolean>;
}