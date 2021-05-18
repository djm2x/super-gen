package com.sportvalue.crs.repositories;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UowService {
	@Autowired public BsplsRepository bspls;
	@Autowired public AccountValuesRepository accountValues;
	@Autowired public BonusesRepository bonuses;
	@Autowired public ChampionshipsRepository championships;
	@Autowired public ChampionshipIndicatorsRepository championshipIndicators;
	@Autowired public ClubsRepository clubs;
	@Autowired public SportsRepository sports;
	@Autowired public PeerGroupsRepository peerGroups;
	@Autowired public ClubIndicatorsRepository clubIndicators;
	@Autowired public CommentsRepository comments;
	@Autowired public CountriesRepository countries;
	@Autowired public CountryIndicatorsRepository countryIndicators;
	@Autowired public FunctionNormalizersRepository functionNormalizers;
	@Autowired public HistoriesRepository histories;
	@Autowired public IndicatorsRepository indicators;
	@Autowired public MapNormalizersRepository mapNormalizers;
	@Autowired public NoterGroupsRepository noterGroups;
	@Autowired public NoterReportGroupsRepository noterReportGroups;
	@Autowired public RangeNormalizersRepository rangeNormalizers;
	@Autowired public ReportConfigsRepository reportConfigs;
	@Autowired public UsersRepository users;
}
