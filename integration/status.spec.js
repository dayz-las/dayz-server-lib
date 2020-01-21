const { status } = require("../");
const { DayzServerStatus } = require("../src/domain/get-server-status.usecase");

describe("status", () => {
  it("Should return an instance of DayzServerStatus when called", () => {
    return status().then(status => {
      expect(status).toBeInstanceOf(DayzServerStatus);
      expect(status.name).toBeTruthy();
      expect(status.map).toBeTruthy();
      expect(status.version).toBeTruthy();
      expect(status.maxPlayers).toBeTruthy();
      expect(status.currentPlayers).toBeTruthy();
      expect(status.online).toBeTruthy();
    });
  });
});
