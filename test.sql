

CREATE TABLE Account (
  id        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  code      varchar(255), 
  label     varchar(255), 
  formula   varchar(255), 
  type      varchar(255), 
  highlight integer(1), 
  bold      integer(1));


CREATE TABLE AccountValue (
  id        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  value     integer(10), 
  Bsplid    integer(10) NOT NULL, 
  Accountid integer(10) NOT NULL, 
  FOREIGN KEY(Bsplid) REFERENCES Bspl(id), 
  FOREIGN KEY(Accountid) REFERENCES Account(id));


CREATE TABLE Bonus (
  id           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  bonus        double(10), 
  comment      varchar(255), 
  type         varchar(255), 
  Clubid       integer(10) NOT NULL, 
  NoterGroupid integer(10) NOT NULL, 
  FOREIGN KEY(Clubid) REFERENCES Club(id), 
  FOREIGN KEY(NoterGroupid) REFERENCES NoterGroup(id));


CREATE TABLE Bspl (
  id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  Year       integer(10), 
  xRate      double(10), 
  currency   varchar(255), 
  Clubid     integer(10) NOT NULL, 
  PreviousId integer(10) NOT NULL, 
  FOREIGN KEY(Clubid) REFERENCES Club(id), 
  FOREIGN KEY(PreviousId) REFERENCES Bspl(id));


CREATE TABLE Championship (
  id        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  code      varchar(255), 
  name      varchar(255), 
  Countryid integer(10) NOT NULL, 
  FOREIGN KEY(Countryid) REFERENCES Country(id));


CREATE TABLE Championship_Indicator (
  score          double(10), 
  value          varchar(255) NOT NULL, 
  Indicatorid    integer(10) NOT NULL, 
  Championshipid integer(10) NOT NULL, 
  FOREIGN KEY(Indicatorid) REFERENCES Indicator(id), 
  FOREIGN KEY(Championshipid) REFERENCES Championship(id));


CREATE TABLE Club (
  id             INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  code           varchar(255), 
  name           varchar(255), 
  peerGroups     varchar(255), 
  description    varchar(255), 
  comment        varchar(255), 
  highlight      varchar(255), 
  company        varchar(255), 
  logopath       varchar(255), 
  sport          varchar(255), 
  Championshipid integer(10) NOT NULL, 
  FOREIGN KEY(Championshipid) REFERENCES Championship(id));


CREATE TABLE Club_Indicator (
  Clubid      integer(10) NOT NULL, 
  Indicatorid integer(10) NOT NULL, 
  score       double(10), 
  type        varchar(255), 
  valueType   varchar(255), 
  value0      varchar(255) NOT NULL, 
  value1      varchar(255), 
  value2      varchar(255), 
  value3      varchar(255), 
  FOREIGN KEY(Clubid) REFERENCES Club(id), 
  FOREIGN KEY(Indicatorid) REFERENCES Indicator(id));


CREATE TABLE Comment (
  id           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  comment      varchar(255), 
  type         varchar(255), 
  Clubid       integer(10) NOT NULL, 
  NoterGroupid integer(10) NOT NULL, 
  FOREIGN KEY(Clubid) REFERENCES Club(id), 
  FOREIGN KEY(NoterGroupid) REFERENCES NoterGroup(id));


CREATE TABLE Country (
  id   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  code varchar(255), 
  name varchar(255));


CREATE TABLE Country_Indicator (
  score       double(10), 
  value       varchar(255) NOT NULL, 
  Indicatorid integer(10) NOT NULL, 
  Countryid   integer(10) NOT NULL, 
  FOREIGN KEY(Indicatorid) REFERENCES Indicator(id), 
  FOREIGN KEY(Countryid) REFERENCES Country(id));


CREATE TABLE FunctionNormalizer (
  id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  "function"  varchar(255), 
  Indicatorid integer(10) NOT NULL, 
  FOREIGN KEY(Indicatorid) REFERENCES Indicator(id));


CREATE TABLE History (
  id           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  "Date"       date, 
  Label        varchar(20), 
  userEmail    varchar(20), 
  type         varchar(255), 
  Clubid       integer(10) NOT NULL, 
  NoterGroupid integer(10) NOT NULL, 
  FOREIGN KEY(Clubid) REFERENCES Club(id), 
  FOREIGN KEY(NoterGroupid) REFERENCES NoterGroup(id));


CREATE TABLE Indicator (
  id           INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  name         varchar(255), 
  weight       integer(10), 
  hint         varchar(255), 
  wa           integer(1), 
  type         varchar(255), 
  sourceType   varchar(255), 
  NoterGroupid integer(10) NOT NULL, 
  FOREIGN KEY(NoterGroupid) REFERENCES NoterGroup(id));


CREATE TABLE MapNormalizer (
  id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  "key"       varchar(255), 
  value       double(10), 
  Indicatorid integer(10) NOT NULL, 
  FOREIGN KEY(Indicatorid) REFERENCES Indicator(id));


CREATE TABLE NoterGroup (
  id         INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  name       varchar(255), 
  type       varchar(255), 
  weight     double(10), 
  SubNoterId integer(10) NOT NULL, 
  FOREIGN KEY(SubNoterId) REFERENCES NoterGroup(id));


CREATE TABLE NoterReportGroup (
  id                            INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  IncludeComment                integer(1), 
  IncludeRadar                  integer(1), 
  IncludeAggregateSubthemes     integer(1), 
  IncludeBenchmarkToMedianValue integer(1), 
  peerGroups                    varchar(255), 
  comparedTos                   varchar(255), 
  noterComments                 varchar(255), 
  indicators                    varchar(255), 
  ReportConfigid                integer(10) NOT NULL, 
  FOREIGN KEY(ReportConfigid) REFERENCES ReportConfig(id));


CREATE TABLE RangeNormalizer (
  id          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  r0          double(10), 
  r1          double(10), 
  r2          double(10), 
  r3          double(10), 
  r4          double(10), 
  Indicatorid integer(10) NOT NULL, 
  FOREIGN KEY(Indicatorid) REFERENCES Indicator(id));


CREATE TABLE ReportConfig (
  id                    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  IncludeRadar          integer(1), 
  IncludeClubComment    integer(1), 
  IncludeClubHighlight  integer(1), 
  IncludeWageAndRevenue integer(1), 
  IncludeLossAndRevenue integer(1), 
  IncludeOffBalance     integer(1), 
  IncludeBSPLSummary    integer(1), 
  IncludeBSPLDetail     integer(1), 
  IncludeBSPLHistory    integer(1), 
  Clubid                integer(10) NOT NULL, 
  FOREIGN KEY(Clubid) REFERENCES Club(id));


CREATE TABLE "User" (
  id            INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  email         varchar(255) NOT NULL, 
  firstname     varchar(255) NOT NULL, 
  lastname      varchar(255) NOT NULL, 
  hasedpassword varchar(255) NOT NULL, 
  role          varchar(255) NOT NULL);
