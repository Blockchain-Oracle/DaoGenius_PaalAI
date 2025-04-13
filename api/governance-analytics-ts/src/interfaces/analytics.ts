/**
 * GovernanceAnalytics interfaces for type safety
 */

// Base response interface
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: string;
  message?: string;
}

// Governance summary interface
export interface GovernanceSummary {
  totalProposals: number;
  activeProposals: number;
  completedProposals: number;
  overallParticipation: number;
  participationTrend: 'Increasing' | 'Decreasing' | 'Stable';
}

// Monthly participation rates
export interface MonthlyParticipation {
  [month: string]: number;
}

// Participation by proposal type
export interface ProposalTypeParticipation {
  [proposalType: string]: number;
}

// Participation metrics interface
export interface ParticipationMetrics {
  byMonth: MonthlyParticipation;
  byProposalType: ProposalTypeParticipation;
}

// Voting distribution by holder size
export interface VotingDistribution {
  whales: number;
  medium: number;
  small: number;
}

// Voting outcomes
export interface VotingOutcomes {
  passed: number;
  rejected: number;
  averageApproval: number;
}

// Voting analytics interface
export interface VotingAnalytics {
  distributionBySize: VotingDistribution;
  outcomes: VotingOutcomes;
}

// Complete analytics response interface
export interface AnalyticsData {
  summary: GovernanceSummary;
  participation: ParticipationMetrics;
  voting: VotingAnalytics;
  insights: string[];
  recommendations: string[];
}

// Proposal detail interface
export interface ProposalDetail {
  id: string;
  title: string;
  status: string;
  participationRate: number;
  startDate: Date;
  endDate: Date;
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
}

// Proposals analytics interface
export interface ProposalsAnalytics {
  proposals: ProposalDetail[];
}

// Voting power distribution
export interface VotingPowerDistribution {
  top10Percent: number;
  middle40Percent: number;
  bottom50Percent: number;
}

// Voting behavior timing distribution
export interface VotingTimingDistribution {
  firstDay: number;
  middlePeriod: number;
  lastDay: number;
}

// Voting behaviors interface
export interface VotingBehaviors {
  averageVotesPerProposal: number;
  timingDistribution: VotingTimingDistribution;
}

// Voter analytics interface
export interface VoterAnalytics {
  activeVoters: number;
  newVoters: number;
  regularVoters: number;
  votingPower: {
    distribution: VotingPowerDistribution;
    giniCoefficient: number;
  };
  behaviors: VotingBehaviors;
}

// Comparison metric interface
export interface ComparisonMetric {
  yourDAO: number;
  categoryAverage: number;
  percentile: number;
}

// Comparison metrics interface
export interface ComparisonMetrics {
  participation: ComparisonMetric;
  proposal_frequency: ComparisonMetric;
  vote_distribution: ComparisonMetric;
}

// Similar DAO interface
export interface SimilarDAO {
  name: string;
  address: string;
  similarity_score: number;
  key_metrics: Record<string, number>;
}

// DAO comparison interface
export interface DAOComparison {
  comparison: ComparisonMetrics;
  similar_daos: SimilarDAO[];
}

// Query parameters for analytics
export interface AnalyticsQueryParams {
  daoAddress: string;
  timeFrame?: 'week' | 'month' | 'quarter' | 'year';
  platforms?: string;
}

// Query parameters for proposals
export interface ProposalsQueryParams extends AnalyticsQueryParams {
  status?: 'active' | 'completed' | 'all';
}

// Query parameters for comparison
export interface ComparisonQueryParams extends AnalyticsQueryParams {
  category?: 'defi' | 'social' | 'metaverse' | 'protocol' | 'investment';
  metrics?: string;
} 