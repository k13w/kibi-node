import * as addPoints from "./addPoints";
import * as createUser from "./createUser";

type Commands = {
    [commandName: string]: {
        data: Object,
        execute: (interaction: any) => void; // Substitua 'any' pelo tipo apropriado para interaction
    };
};

export const commands: Commands = {
    'add': addPoints,
    'createuser': createUser
};