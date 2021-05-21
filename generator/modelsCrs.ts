export class Bspl {
  id = 0
  code = '';
  label = '';
  formula = '';
  type = '';
  highlight = true;
  bold = true;
  xRate = 0;
  currency = '';
  accountValues: AccountValue[] = [];
  previous = new Bspl();
  childs: Bspl[] = [];
}


export class AccountValue {
  id = 0
  value = '';
  bspl = new Bspl();
  club = new Club();
}

export class Bonus {
  id = 0
  bonus = 0;
  comment = '';
  type = '';
  club = new Club();
  noterGroup = new NoterGroup();
}


export class Championship {
  id = 0
  code = '';
  name = '';
  country = new Country();
  clubs: Club[] = [];
  championshipIndicators: ChampionshipIndicator[] = [];
}

export class ChampionshipIndicator {
  id = 0;
  score = 0;
  value0 = '';
  value1 = '';
  value2 = '';
  value3 = '';

  indicator = new Indicator();
  championship = new Championship();
}

export class Club {
  id = 0
  code = '';
  name = '';
  description = '';
  comment = '';
  highlight = '';
  company = '';
  logopath = '';
  id_sport = 0;
  sport = new Sport();
  id_championship = 0;
  championship = new Championship();
  bonuses: Bonus[] = [];
  clubIndicators: ClubIndicator[] = [];
  comments: Comment[] = [];
  historys: History[] = [];
  accountValues: AccountValue[] = [];
  peerGroups: PeerGroup[] = [];
  reportConfigs: ReportConfig[] = [];
}

export class Sport {
  id = 0
  name = '';
  clubs: Club[] = [];
}

export class PeerGroup {
  id = 0
  name = '';
  club = new Club();
}

export class ClubIndicator {
  id = 0;
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
  championships: Championship[] = [];
  countryIndicators: CountryIndicator[] = [];
}

export class CountryIndicator {
  id = 0;
  score = 0
  type = '';
  value0 = '';
  value1 = '';
  value2 = '';
  value3 = '';
  indicator = new Indicator();
  country = new Country();
}

export class FunctionNormalizer {
  id = 0
  _function = '';
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
  clubIndicators: ClubIndicator[] = [];
  countryIndicators: CountryIndicator[] = [];
  functionNormalizers: FunctionNormalizer[] = [];
  mapNormalizers: MapNormalizer[] = [];
  rangeNormalizers: RangeNormalizer[] = [];
  championshipIndicators: ChampionshipIndicator[] = [];
}

export class MapNormalizer {
  id = 0
  _key = '';
  value = 0;
  indicator = new Indicator();
}

export class NoterGroup {
  id = 0
  name = '';
  level = 0;
  weight = 0;
  parent = new NoterGroup();
  childs: NoterGroup[] = [];
  bonuses: Bonus[] = [];
  comments: Comment[] = [];
  historys: History[] = [];
  indicators: Indicator[] = [];
}

export class NoterReportGroup {
  id = 0;
  type = '';
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
  noterReportGroups: NoterReportGroup[] = [];
  club = new Club();
}

export class User {
  id = 0;
  email = '';
  firstname = '';
  lastname = '';
  hasedpassword = '';
  role = '';
}