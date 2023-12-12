export enum rangAventurier {
    Paysan = "paysan",
    Bourgeois = "bourgeois",
    Noble = "noble",
    Royal = "royal"
}

export enum classeAventurier {
    Guerrier = "guérrier",
    Mage = "mage",
    Voleur = "voleur",
    Barde = "barde"
}

export interface IMonstre {
    _id : String;
    nom : String;
    raceId : String;
    niveau : Number;
    age : Number;
    amisId : String[];
    dateNaissance : Date;
    aventuriersVaincus : 
        {
            nom : String;
            niveau : Number;
            rang : rangAventurier;
            classe : classeAventurier;
        }[];
}