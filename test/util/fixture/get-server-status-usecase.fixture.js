const {
  DayzServerStatus
} = require("../../../src/domain/get-server-status.usecase");

const fixture = new DayzServerStatus();

fixture.name = "DayZ LAS (SCL)-Persistencia-24/7- https://discord.gg/pHp62zB";
fixture.map = "chernarusplus";
fixture.version = "1.06.152885";
fixture.maxPlayers = 60;
fixture.currentPlayers = 1;
fixture.online = true;

exports.getServerStatusUseCaseFixture = fixture;
