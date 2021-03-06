use crs
GO
SET IDENTITY_INSERT noter_groups ON
INSERT INTO noter_groups (id, id_parent ,level ,name ,weight) VALUES
(1, NULL, 1, 'Macroeconomy', 5.0),
(2, 1, 2, 'Growth', 15.0),
(3, 2, 3, 'Growth', NULL),
(4, 1, 2, 'Unemployment', 15.0),
(5, 4, 3, 'Unemployment', NULL),
(6, 1, 2, 'Inflation', 15.0),
(7, 6, 3, 'Inflation', NULL),
(8, 1, 2, 'Trade', 10.0),
(9, 8, 3, 'Trade', NULL),
(10, 1, 2, 'Sovereign rating', 15.0),
(11, 10, 3, 'Sovereign rating', NULL),
(12, 1, 2, 'Wealth', 15.0),
(13, 12, 3, 'Wealth', NULL),
(14, 1, 2, 'Demography', 15.0),
(15, 14, 3, 'Demography', NULL),
(16, NULL, 1, 'Championship', 10.0),
(17, 16, 2, 'Broadcasting', 20.0),
(18, 17, 3, 'Quantitative', NULL),
(19, 17, 3, 'Qualitative', NULL),
(20, 16, 2, 'Regulation', 25.0),
(21, 20, 3, 'Regulatory environment', NULL),
(22, 16, 2, 'Attendance', 15.0),
(23, 22, 3, 'Attendance', NULL),
(24, 16, 2, 'Specificity of the league', 5.0),
(25, 24, 3, 'Championship', NULL),
(26, 16, 2, 'Competitiveness', 15.0),
(27, 26, 3, 'European', NULL),
(28, 26, 3, 'Domestic', NULL),
(29, 16, 2, 'Trading', 5.0),
(30, 29, 3, 'Trading', NULL),
(31, 16, 2, 'Financial health', 15.0),
(32, 31, 3, 'Revenue', NULL),
(33, 31, 3, 'Cost structure', NULL),
(34, 31, 3, 'Profitability', NULL),
(35, 31, 3, 'Solvability', NULL),
(36, 31, 3, 'Indebtedness', NULL),
(37, NULL, 1, 'Financial', 70.0),
(38, 37, 2, 'Operation', 30.0),
(39, 38, 3, 'Trend', NULL),
(40, 38, 3, 'Structure of the revenues', NULL),
(41, 38, 3, 'Weight of the payroll costs', NULL),
(42, 38, 3, 'Profitability', NULL),
(43, 37, 2, 'Trading', 5.0),
(44, 43, 3, 'Dependence on the trading activity', NULL),
(45, 37, 2, 'Solvability', 25.0),
(46, 45, 3, 'Capital structure', NULL),
(47, 45, 3, 'Trend', NULL),
(48, 37, 2, 'Liquidity', 20.0),
(49, 48, 3, 'Liquidity', NULL),
(50, 48, 3, 'Short term debt', NULL),
(51, 48, 3, 'Trend', NULL),
(52, 37, 2, 'Indebtedness', 20.0),
(53, 52, 3, 'Debt weight', NULL),
(54, 52, 3, 'Trend', NULL),
(55, NULL, 1, 'ExtraFinancial', 15.0),
(56, 55, 2, 'Shareholders', 15.0),
(57, 56, 3, 'Structure', NULL),
(58, 56, 3, 'Loyalty', NULL),
(59, 55, 2, 'Governance', 12.5),
(60, 59, 3, 'Board of directors', NULL),
(61, 59, 3, 'Audit', NULL),
(62, 55, 2, 'Competitive records', 15.0),
(63, 62, 3, 'History', NULL),
(64, 62, 3, 'Domestic', NULL),
(65, 62, 3, 'European', NULL),
(66, 55, 2, 'Club Culture', 2.5),
(67, 66, 3, 'Staff', NULL),
(68, 55, 2, 'Quality of the players', 15.0),
(69, 68, 3, 'Players` main characteristics', NULL),
(70, 55, 2, 'Fame', 15.0),
(71, 70, 3, 'Web', NULL),
(72, 70, 3, 'Spectators', NULL),
(73, 55, 2, 'Training and academy', 5.0),
(74, 73, 3, 'Youth policy', NULL),
(75, 55, 2, 'Customers', 2.5),
(76, 75, 3, 'Contract duration', NULL),
(77, 75, 3, 'Contract turnover', NULL),
(78, 55, 2, 'Infrastructures', 12.5),
(79, 78, 3, 'Stadium', NULL),
(80, 78, 3, 'Training Center', NULL),
(81, 55, 2, 'Probity', 5.0),
(82, 81, 3, 'National (transparency international)', NULL),

SET IDENTITY_INSERT noter_groups OFF
GO