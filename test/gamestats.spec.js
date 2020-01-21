const getServerStatusUseCase = require("../src/domain/get-server-status.usecase.js");
const gamedig = require("gamedig");

const DAYZ_HOST = "dayz.moralesm.cl";
const DAYZ_QUERY_PORT = 27016;
const DAYZ_GAME_TYPE = "dayz";

const {
  gamedigResponseFixture
} = require("./util/fixture/gamedig-response.fixture");

describe("get server status use case", () => {
  beforeEach(() => {
    gamedig.query = jest.fn(() => Promise.resolve(gamedigResponseFixture));
  });

  it("Should return a Promise that resolves to DayzServerStatus instancea when execute is called, given gamedig.query resolves", () => {
    return getServerStatusUseCase.execute().then(result => {
      expect(result).toBeInstanceOf(getServerStatusUseCase.DayzServerStatus);
    });
  });

  it("Should map gamedigResponse attributes to DayzServerStatus ones, when execute is called, given gamedig.query resolves", () => {
    return getServerStatusUseCase.execute().then(result => {
      expect(result.name).toEqual(gamedigResponseFixture.name);
      expect(result.map).toEqual(gamedigResponseFixture.map);
      expect(result.version).toEqual(gamedigResponseFixture.raw.version);
      expect(result.maxPlayers).toEqual(gamedigResponseFixture.maxplayers);
      expect(result.currentPlayers).toEqual(
        gamedigResponseFixture.players.length
      );
    });
  });

  it("Should set online to true when execute is called, given gamedig.query resolves", () => {
    return getServerStatusUseCase.execute().then(result => {
      expect(result.online).toBeTruthy();
    });
  });

  it("Should map online to false when execute is called, given gamedig.query rejects", () => {
    gamedig.query = jest.fn(() => Promise.reject());
    return getServerStatusUseCase.execute().then(result => {
      expect(result.online).toBeFalsy();
    });
  });

  it("Should call gamedig.query with server host, port and type when execute is called", () => {
    getServerStatusUseCase.execute();
    expect(gamedig.query).toBeCalledWith({
      host: DAYZ_HOST,
      port: DAYZ_QUERY_PORT,
      type: DAYZ_GAME_TYPE
    });
  });
});
