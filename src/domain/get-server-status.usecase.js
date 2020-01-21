const gamedig = require("gamedig");

const DAYZ_HOST = "dayz.moralesm.cl";
const DAYZ_QUERY_PORT = 27016;
const DAYZ_GAME_TYPE = "dayz";

let DayzServerStatus = (exports.DayzServerStatus = class {
  constructor() {
    this._name = "";
    this._map = "";
    this._version = "";
    this._online = false;
    this._maxPlayers = 0;
    this._currentPlayers = 0;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get map() {
    return this._map;
  }

  set map(value) {
    this._map = value;
  }

  get version() {
    return this._version;
  }

  set version(value) {
    this._version = value;
  }

  get online() {
    return this._online;
  }

  set online(value) {
    this._online = value;
  }

  get maxPlayers() {
    return this._maxPlayers;
  }

  set maxPlayers(value) {
    this._maxPlayers = value;
  }

  get currentPlayers() {
    return this._currentPlayers;
  }

  set currentPlayers(value) {
    this._currentPlayers = value;
  }
});

exports.execute = function() {
  return gamedig
    .query({
      host: DAYZ_HOST,
      port: DAYZ_QUERY_PORT,
      type: DAYZ_GAME_TYPE
    })
    .then(result => {
      return mapResultToDayzServerStatus(result);
    })
    .catch(() => {
      return createErrorResult();
    });
};

function mapResultToDayzServerStatus(result) {
  let serverStatus = new DayzServerStatus();
  serverStatus.name = result.name;
  serverStatus.map = result.map;
  serverStatus.version = result.raw.version;
  serverStatus.maxPlayers = result.maxplayers;
  serverStatus.currentPlayers = result.players.length;
  serverStatus.online = true;
  return serverStatus;
}

function createErrorResult() {
  let serverStatus = new DayzServerStatus();
  serverStatus.online = false;
  return serverStatus;
}
