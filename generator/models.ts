export class Account {
  id = 0
  code = '';
  label = '';
  formula = '';
  type = '';
  highlight = true;
  bold = true;
}


export class AccountValue {
  id = 0
  value = '';
  bspl = new Bspl();
  account = new Account();
}

export class Bonus {
  id = 0
  bonus = 0;
  comment = '';
  type = '';
  club = new Club();
  noterGroup = new NoterGroup();
}

export class Bspl {
  id = 0
  year = 0;
  xRate = '';
  currency = '';
  club = new Club();
  bspl = new Bspl();
}


export class Championship {
  id = 0
  code = '';
  name = '';
  country = new Country();
}

export class Club {
  id = 0
  code = '';
  name = '';
  peerGroups = '';
  description = '';
  comment = '';
  highlight = '';
  company = '';
  logopath = '';
  sport = '';
  championship = new Championship();
}

export class ClubIndicator {
  club = new Club();
  indicator = new Indicator();
  score = 0;
  type = '';
  valueType = '';
  value0 = '';
  value1 = '';
  value2 = '';
  value3 = '';
}

export class Comment {
  id = 0
  comment = '';
  type = '';
  club = new Club();
  noterGroup = new NoterGroup();
}

export class Country {
  id = 0
  code = '';
  name = '';
}

export class CountryIndicator {
  indicator = new Indicator();
  country = new Country();
  score = 0
  value = '';
}

export class FunctionNormalizer {
  id = 0
  function = '';
  indicator = new Indicator();
}

export class History {
  id = 0
  Date = new Date();
  Label = '';
  userEmail = '';
  type = '';
  club = new Club();
  noterGroup = new NoterGroup();
}

export class Indicator {
  id = 0
  name = '';
  weight = 0;
  hint = '';
  wa = true;
  type = '';
  sourceType = '';
  noterGroup = new NoterGroup();
}

export class MapNormalizer {
  id = 0
  key = '';
  value = 0;
  indicator = new Indicator();
}

export class NoterGroup {
  id = 0
  name = '';
  type = '';
  weight = 0;
  parent = new NoterGroup();
  childs: NoterGroup[] = [];
}

export class NoterReportGroup {
  id = 0
  IncludeComment = true;
  IncludeRadar = true;
  IncludeAggregateSubthemes = true;
  IncludeBenchmarkToMedianValue = true;
  peerGroups = '';
  comparedTos = '';
  noterComments = '';
  indicators = '';
  reportConfig = new ReportConfig();
}

export class RangeNormalizer {
  id = 0;
  r0 = 0;
  r1 = 0;
  r2 = 0;
  r3 = 0;
  r4 = 0;
  indicator = new Indicator();
}

export class ReportConfig {
  id = 0;
  includeRadar = false;
  includeClubComment = false;
  includeClubHighlight = false;
  includeWageAndRevenue = false;
  includeLossAndRevenue = false;
  includeOffBalance = false;
  includeBSPLSummary = false;
  includeBSPLDetail = false;
  includeBSPLHistory = false;
}

export class User {
  id = 0;
  email = '';
  firstname = '';
  lastname = '';
  hasedpassword = '';
  role = '';
}