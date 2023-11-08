import * as addPoints from './add-points';
import * as removePoints from './remove-points';
import * as createUser from './create-user';
import * as addToWatchList from './add-to-watchlist';
import * as lostSiege from './lost-siege';
import * as watchlist from './watchlist';
import * as points from './points';

interface Commands {
  [commandName: string]: {
    data?: Object
    execute: (interaction: any) => void;
  };
};

export const commands: Commands = {
  // addpoints: addPoints,
  // removepoints: removePoints,
  createuser: createUser,
  addtowatchlist: addToWatchList,
  lostsiege: lostSiege,
  watchlist: watchlist,
  // points: points,
};
