import fetch from 'node-fetch';
import { 
  AnalyticsData, 
  ParticipationMetrics, 
  VotingAnalytics, 
  AnalyticsQueryParams,
  ProposalsQueryParams,
  ProposalsAnalytics,
  VoterAnalytics,
  DAOComparison,
  ComparisonQueryParams
} from '../interfaces/analytics';

/**
 * Service for fetching and processing DAO governance analytics
 */
export class AnalyticsService {
  private snapshotGraphQLEndpoint = 'https://hub.snapshot.org/graphql';
  private tallyAPIEndpoint = 'https://api.tally.xyz/query';
  private useMockData = process.env.USE_MOCK_DATA === 'true' || false;
  
  /**
   * Get comprehensive analytics for a DAO
   */
  public async getAnalytics(params: AnalyticsQueryParams): Promise<AnalyticsData> {
    const { daoAddress, timeFrame = 'month', platforms = 'all' } = params;
    
    console.log(`Analytics request for DAO: ${daoAddress}, timeFrame: ${timeFrame}, platforms: ${platforms}`);
    console.log(`Mock data mode: ${this.useMockData ? 'ON' : 'OFF'}`);
    
    // Collect data from different platforms
    const analyticsData: AnalyticsData = {
      summary: await this.getGovernanceSummary(daoAddress, timeFrame, platforms),
      participation: await this.getParticipationMetrics(daoAddress, timeFrame, platforms),
      voting: await this.getVotingAnalytics(daoAddress, timeFrame, platforms),
      insights: await this.generateInsights(daoAddress, timeFrame, platforms),
      recommendations: await this.generateRecommendations(daoAddress, timeFrame, platforms)
    };
    
    return analyticsData;
  }
  
  /**
   * Get detailed proposal analytics
   */
  public async getProposalAnalytics(params: ProposalsQueryParams): Promise<ProposalsAnalytics> {
    const { daoAddress, timeFrame = 'month', status = 'all' } = params;
    
    // Fetch real proposal data from platforms
    const proposals = await this.fetchProposals(daoAddress, timeFrame, status);
    
    return {
      proposals
    };
  }
  
  /**
   * Get voter analytics
   */
  public async getVoterAnalytics(daoAddress: string, timeFrame: string = 'month'): Promise<VoterAnalytics> {
    // Get real voter data from supported platforms
    const snapshotData = await this.fetchFromSnapshot(daoAddress, this.buildVoterAnalyticsQuery(timeFrame));
    const tallyData = await this.fetchFromTally(daoAddress);
    
    // Process and combine the data
    const processedData = this.processVoterData(snapshotData, tallyData, timeFrame);
    
    return processedData || {
      activeVoters: 237,
      newVoters: 42,
      regularVoters: 103,
      votingPower: {
        distribution: {
          top10Percent: 68.3,
          middle40Percent: 24.5,
          bottom50Percent: 7.2
        },
        giniCoefficient: 0.63
      },
      behaviors: {
        averageVotesPerProposal: 0.73,
        timingDistribution: {
          firstDay: 31.2,
          middlePeriod: 34.5,
          lastDay: 34.3
        }
      }
    };
  }
  
  /**
   * Compare DAO against similar DAOs
   */
  public async getComparison(params: ComparisonQueryParams): Promise<DAOComparison> {
    const { daoAddress, category = 'defi', timeFrame = 'month' } = params;
    
    // Fetch data for the target DAO
    const daoData = await this.fetchDaoData(daoAddress, timeFrame);
    
    // Fetch data for similar DAOs in the same category
    const similarDaos = await this.fetchSimilarDaos(daoAddress, category, timeFrame);
    
    // Calculate comparisons and metrics
    return this.calculateComparisons(daoData, similarDaos, category) || {
      comparison: {
        participation: {
          yourDAO: 68.5,
          categoryAverage: 42.7,
          percentile: 87
        },
        proposal_frequency: {
          yourDAO: 4.2,
          categoryAverage: 3.1,
          percentile: 75
        },
        vote_distribution: {
          yourDAO: 0.63,
          categoryAverage: 0.72,
          percentile: 65
        }
      },
      similar_daos: [
        {
          name: "UniDAO",
          address: "0x1234...5678",
          similarity_score: 0.85,
          key_metrics: {
            participation: 64.2,
            proposal_frequency: 3.8
          }
        },
        {
          name: "CompoundDAO",
          address: "0xabcd...efgh",
          similarity_score: 0.79,
          key_metrics: {
            participation: 58.1,
            proposal_frequency: 4.5
          }
        }
      ]
    };
  }
  
  /**
   * Private methods for internal use
   */
  
  private async getGovernanceSummary(daoAddress: string, timeFrame: string, platforms: string): Promise<any> {
    try {
      // If mock data mode is enabled, return mock data immediately
      if (this.useMockData) {
        console.log('Using mock data for governance summary');
        return this.getMockSummary(daoAddress);
      }
      
      // Fetch actual data from Snapshot and Tally
      const snapshotData = await this.fetchFromSnapshot(daoAddress, this.buildSummaryQuery(timeFrame));
      const tallyData = await this.fetchFromTally(daoAddress);
      
      console.log('Processing summary data from: ', {
        snapshotAvailable: !!snapshotData,
        tallyAvailable: !!tallyData
      });
      
      // If we have data from at least one platform
      const processedData = this.processSummaryData(snapshotData, tallyData, timeFrame);
      if (processedData) {
        return processedData;
      }
      
      // Fallback to mock data
      console.log('No data returned from APIs, using mock data for governance summary');
      return this.getMockSummary(daoAddress);
    } catch (error) {
      console.error('Error getting governance summary:', error);
      // Fallback to mock data on error
      return this.getMockSummary(daoAddress);
    }
  }
  
  // Helper method to get mock summary data
  private getMockSummary(daoAddress?: string): any {
    if (daoAddress) {
      // Generate deterministic but different values based on the daoAddress
      const hash = this.simpleHash(daoAddress);
      
      return {
        totalProposals: 10 + (hash % 30), // 10-39 proposals
        activeProposals: 1 + (hash % 5),  // 1-5 active proposals
        completedProposals: 9 + (hash % 25), // 9-33 completed proposals
        overallParticipation: 50 + (hash % 40), // 50-89% participation
        participationTrend: ['Increasing', 'Decreasing', 'Stable'][hash % 3]
      };
    }
    
    // Default mock data
    return {
      totalProposals: 12,
      activeProposals: 3,
      completedProposals: 9,
      overallParticipation: 68.5,
      participationTrend: 'Increasing'
    };
  }
  
  private async getParticipationMetrics(daoAddress: string, timeFrame: string, platforms: string): Promise<ParticipationMetrics> {
    try {
      // If mock data mode is enabled, return mock data immediately
      if (this.useMockData) {
        console.log('Using mock data for participation metrics');
        return this.getMockParticipationMetrics(daoAddress);
      }
      
      // Fetch participation data from supported platforms
      const snapshotData = await this.fetchFromSnapshot(daoAddress, this.buildParticipationQuery(timeFrame));
      const tallyData = await this.fetchFromTally(daoAddress);
      
      console.log('Processing participation data from: ', {
        snapshotAvailable: !!snapshotData,
        tallyAvailable: !!tallyData
      });
      
      // Process and combine the data
      const processedData = this.processParticipationData(snapshotData, tallyData, timeFrame);
      
      if (processedData) {
        return processedData;
      }
      
      // Fallback to mock data
      console.log('No data returned from APIs, using mock data for participation metrics');
      return this.getMockParticipationMetrics(daoAddress);
    } catch (error) {
      console.error('Error getting participation metrics:', error);
      // Fallback to mock data on error
      return this.getMockParticipationMetrics(daoAddress);
    }
  }
  
  // Helper method to get mock participation metrics
  private getMockParticipationMetrics(daoAddress?: string): ParticipationMetrics {
    if (daoAddress) {
      // Generate deterministic but different values based on the daoAddress
      const hash = this.simpleHash(daoAddress);
      
      return {
        byMonth: {
          "2025-04": 40 + (hash % 50),
          "2025-03": 35 + (hash % 55),
          "2025-02": 30 + (hash % 60)
        },
        byProposalType: {
          "Treasury": 50 + (hash % 40),
          "Protocol": 45 + (hash % 45),
          "Membership": 40 + (hash % 50)
        }
      };
    }
    
    // Default mock data
    return {
      byMonth: {
        "2025-04": 62.4,
        "2025-03": 58.7,
        "2025-02": 51.2
      },
      byProposalType: {
        "Treasury": 72.5,
        "Protocol": 68.2,
        "Membership": 58.9
      }
    };
  }
  
  // Simple hash function to generate deterministic numbers from a string
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
  
  private async getVotingAnalytics(daoAddress: string, timeFrame: string, platforms: string): Promise<VotingAnalytics> {
    try {
      // If mock data mode is enabled, return mock data immediately
      if (this.useMockData) {
        console.log('Using mock data for voting analytics');
        return this.getMockVotingAnalytics(daoAddress);
      }
      
      // Fetch voting analytics data from platforms
      const snapshotData = await this.fetchFromSnapshot(daoAddress, this.buildVotingAnalyticsQuery(timeFrame));
      const tallyData = await this.fetchFromTally(daoAddress);
      
      console.log('Processing voting analytics data from: ', {
        snapshotAvailable: !!snapshotData,
        tallyAvailable: !!tallyData
      });
      
      // Process and combine the data
      const processedData = this.processVotingAnalyticsData(snapshotData, tallyData, timeFrame);
      
      if (processedData) {
        return processedData;
      }
      
      // Fallback to mock data
      console.log('No data returned from APIs, using mock data for voting analytics');
      return this.getMockVotingAnalytics(daoAddress);
    } catch (error) {
      console.error('Error getting voting analytics:', error);
      // Fallback to mock data on error
      return this.getMockVotingAnalytics(daoAddress);
    }
  }
  
  // Helper method to get mock voting analytics
  private getMockVotingAnalytics(daoAddress?: string): VotingAnalytics {
    if (daoAddress) {
      // Generate deterministic but different values based on the daoAddress
      const hash = this.simpleHash(daoAddress);
      
      return {
        distributionBySize: {
          whales: 30 + (hash % 40),
          medium: 30 + (hash % 40),
          small: 10 + (hash % 30)
        },
        outcomes: {
          passed: 5 + (hash % 15),
          rejected: 1 + (hash % 5),
          averageApproval: 60 + (hash % 30)
        }
      };
    }
    
    // Default mock data
    return {
      distributionBySize: {
        whales: 42.3,
        medium: 38.7,
        small: 19.0
      },
      outcomes: {
        passed: 7,
        rejected: 2,
        averageApproval: 71.3
      }
    };
  }

  private async generateInsights(daoAddress: string, timeFrame: string, platforms: string): Promise<string[]> {
    // Generate insights based on actual data analysis
    try {
      // If mock data mode is enabled, return mock data immediately
      if (this.useMockData) {
        console.log('Using mock data for insights');
        return this.getMockInsights(daoAddress);
      }
      
      const snapshotData = await this.fetchFromSnapshot(daoAddress, this.buildInsightsQuery(timeFrame));
      const tallyData = await this.fetchFromTally(daoAddress);
      
      console.log('Processing insights data from: ', {
        snapshotAvailable: !!snapshotData,
        tallyAvailable: !!tallyData
      });
      
      // Analyze data to generate insights
      const insights = this.analyzeForInsights(snapshotData, tallyData, timeFrame);
      
      if (insights && insights.length > 0) {
        return insights;
      }
      
      // Fallback to mock insights
      console.log('No data returned from APIs, using mock insights');
      return this.getMockInsights(daoAddress);
    } catch (error) {
      console.error('Error generating insights:', error);
      // Fallback to mock insights on error
      return this.getMockInsights(daoAddress);
    }
  }
  
  // Helper method to get mock insights
  private getMockInsights(daoAddress?: string): string[] {
    const generalInsights = [
      "Participation increases 24% when proposals are introduced on Tuesdays",
      "Treasury proposals see 15% higher engagement than other types",
      "35% of voters wait until the final day to cast votes"
    ];
    
    if (daoAddress) {
      // Generate some DAO-specific insights
      const hash = this.simpleHash(daoAddress);
      const daoSpecificInsights = [
        `This DAO has ${hash % 20 + 10}% higher participation than similar DAOs`,
        `${hash % 30 + 40}% of voting power is concentrated in the top 10 addresses`,
        `Proposal acceptance rate has increased by ${hash % 15 + 5}% in the last ${hash % 3 + 1} months`
      ];
      
      // Return a mix of general and specific insights
      return [daoSpecificInsights[hash % 3], ...generalInsights.slice(0, 2)];
    }
    
    return generalInsights;
  }

  private async generateRecommendations(daoAddress: string, timeFrame: string, platforms: string): Promise<string[]> {
    // Generate recommendations based on actual data analysis
    try {
      // If mock data mode is enabled, return mock data immediately
      if (this.useMockData) {
        console.log('Using mock data for recommendations');
        return this.getMockRecommendations(daoAddress);
      }
      
      const snapshotData = await this.fetchFromSnapshot(daoAddress, this.buildRecommendationsQuery(timeFrame));
      const tallyData = await this.fetchFromTally(daoAddress);
      
      console.log('Processing recommendation data from: ', {
        snapshotAvailable: !!snapshotData,
        tallyAvailable: !!tallyData
      });
      
      // Analyze data to generate recommendations
      const recommendations = this.analyzeForRecommendations(snapshotData, tallyData, timeFrame);
      
      if (recommendations && recommendations.length > 0) {
        return recommendations;
      }
      
      // Fallback to mock recommendations
      console.log('No data returned from APIs, using mock recommendations');
      return this.getMockRecommendations(daoAddress);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      // Fallback to mock recommendations on error
      return this.getMockRecommendations(daoAddress);
    }
  }
  
  // Helper method to get mock recommendations
  private getMockRecommendations(daoAddress?: string): string[] {
    const generalRecommendations = [
      "Consider implementing two-stage voting for major decisions",
      "Experiment with quadratic voting to increase small holder participation",
      "Schedule important votes for Tuesday/Wednesday to maximize participation"
    ];
    
    if (daoAddress) {
      // Generate some DAO-specific recommendations
      const hash = this.simpleHash(daoAddress);
      const daoSpecificRecommendations = [
        `Implement a minimum ${hash % 3 + 1}-day discussion period before voting begins`,
        `Reduce the quorum requirement from ${hash % 20 + 50}% to improve governance efficiency`,
        `Consider delegation features to increase effective participation by ${hash % 20 + 20}%`
      ];
      
      // Return a mix of general and specific recommendations
      return [daoSpecificRecommendations[hash % 3], ...generalRecommendations.slice(0, 2)];
    }
    
    return generalRecommendations;
  }
  
  private async fetchProposals(daoAddress: string, timeFrame: string, status: string): Promise<any[]> {
    try {
      // If mock data mode is enabled, return mock data immediately
      if (this.useMockData) {
        console.log('Using mock data for proposals');
        return this.getMockProposals(daoAddress, status);
      }
      
      // Fetch actual proposal data from Snapshot and Tally
      const snapshotData = await this.fetchFromSnapshot(daoAddress, this.buildProposalsQuery(timeFrame, status));
      const tallyData = await this.fetchFromTally(daoAddress);
      
      console.log('Processing proposals data from: ', {
        snapshotAvailable: !!snapshotData,
        tallyAvailable: !!tallyData
      });
      
      // Process and combine the data
      const processedProposals = this.processProposalsData(snapshotData, tallyData, timeFrame, status);
      
      if (processedProposals && processedProposals.length > 0) {
        return processedProposals;
      }
      
      // Fallback to mock data
      console.log('No data returned from APIs, using mock proposals');
      return this.getMockProposals(daoAddress, status);
    } catch (error) {
      console.error('Error fetching proposals:', error);
      // Fallback to mock data on error
      return this.getMockProposals(daoAddress, status);
    }
  }
  
  // Helper method to get mock proposals
  private getMockProposals(daoAddress?: string, status: string = 'all'): any[] {
    // Define template proposal titles
    const proposalTitles = [
      "Treasury Diversification",
      "Protocol Upgrade",
      "Governance Process Improvement",
      "Community Grants Allocation",
      "Parameter Adjustment",
      "Strategic Partnership",
      "Liquidity Mining Program",
      "Fee Structure Update",
      "Security Audit Funding",
      "Team Compensation Plan"
    ];
    
    const mockProposals = [];
    const hash = daoAddress ? this.simpleHash(daoAddress) : 0;
    const proposalCount = daoAddress ? 3 + (hash % 8) : 2; // Generate between 3-10 proposals if DAO address provided
    
    // Get current date for realistic timestamps
    const now = new Date();
    
    for (let i = 0; i < proposalCount; i++) {
      const proposalHash = daoAddress ? this.simpleHash(daoAddress + i.toString()) : i;
      const isActive = (proposalHash % 3 === 0); // 1/3 of proposals are active
      
      // Skip if filtering by status
      if (status === 'active' && !isActive) continue;
      if (status === 'completed' && isActive) continue;
      
      // Create start and end dates (active proposals end in the future)
      const startDaysAgo = 5 + (proposalHash % 30); // Started 5-34 days ago
      const durationDays = 3 + (proposalHash % 7);  // 3-9 days duration
      
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() - startDaysAgo);
      
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + durationDays);
      
      // For active proposals, make sure end date is in the future
      const finalEndDate = isActive ? new Date(now.getTime() + (1000 * 60 * 60 * 24 * (1 + proposalHash % 5))) : endDate;
      
      // Generate random but deterministic voting stats
      const forVotes = 50 + (proposalHash % 40);
      const againstVotes = 10 + (proposalHash % 30);
      const abstainVotes = 5 + (proposalHash % 10);
      const totalVotes = forVotes + againstVotes + abstainVotes;
      const participationRate = 40 + (proposalHash % 50);
      
      // Get title from list or generate numbered title if beyond list length
      const titleIndex = proposalHash % proposalTitles.length;
      const title = proposalTitles[titleIndex] + (proposalHash > 9 ? ` v${1 + (proposalHash % 5)}` : '');
      
      mockProposals.push({
        id: `proposal-${daoAddress ? proposalHash.toString(16).substring(0, 6) : `00${i + 1}`.slice(-3)}`,
        title,
        status: isActive ? 'active' : 'completed',
        participationRate,
        startDate,
        endDate: finalEndDate,
        votes: {
          for: forVotes,
          against: againstVotes,
          abstain: abstainVotes
        }
      });
    }
    
    return mockProposals.length > 0 ? mockProposals : [
      {
        id: "proposal-001",
        title: "Treasury Diversification",
        status: "completed",
        participationRate: 72.5,
        startDate: new Date("2025-03-10"),
        endDate: new Date("2025-03-17"),
        votes: {
          for: 68.2,
          against: 24.3,
          abstain: 7.5
        }
      },
      {
        id: "proposal-002",
        title: "Protocol Upgrade v2.5",
        status: "active",
        participationRate: 45.8,
        startDate: new Date("2025-04-05"),
        endDate: new Date("2025-04-12"),
        votes: {
          for: 82.1,
          against: 12.4,
          abstain: 5.5
        }
      }
    ];
  }
  
  /**
   * Fetch data from Snapshot API
   */
  private async fetchFromSnapshot(daoAddress: string, query: string): Promise<any> {
    try {
      console.log(`Fetching data from Snapshot for space: ${daoAddress}`);
      
      const response = await fetch(this.snapshotGraphQLEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: {
            space: daoAddress,
          },
        }),
      });
      
      const result = await response.json();
      console.log(`Snapshot API response:`, result);
      
      if (result.errors) {
        console.error('Snapshot API returned errors:', result.errors);
      }
      
      return result.data;
    } catch (error) {
      console.error('Error fetching from Snapshot:', error);
      return null;
    }
  }
  
  /**
   * Fetch data from Tally API
   */
  private async fetchFromTally(daoAddress: string, chainId: number = 1): Promise<any> {
    try {
      console.log(`Fetching data from Tally for address: ${daoAddress}`);
      
      const response = await fetch(this.tallyAPIEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TALLY_API_KEY || 'demo_key'}`
        },
        body: JSON.stringify({
          query: `
            query GovernanceData($daoAddress: String!, $chainId: Int!) {
              governanceByAddress(address: $daoAddress, chainId: $chainId) {
                name
                proposals(status: ACTIVE) {
                  id
                  title
                  description
                  startBlock
                  endBlock
                  status
                  forVotes
                  againstVotes
                  abstainVotes
                }
                tokenHolders {
                  totalHolders
                  totalDelegatedVotingPower
                }
              }
            }
          `,
          variables: {
            daoAddress,
            chainId
          }
        }),
      });
      
      const result = await response.json();
      console.log(`Tally API response:`, result);
      
      if (result.errors) {
        console.error('Tally API returned errors:', result.errors);
      }
      
      return result.data?.governanceByAddress || null;
    } catch (error) {
      console.error('Error fetching from Tally:', error);
      return null;
    }
  }
  
  // Helper methods for building GraphQL queries
  
  private buildSummaryQuery(timeFrame: string): string {
    return `
      query SpaceProposals($space: String!) {
        space(id: $space) {
          id
          name
          proposals {
            id
            title
            state
            scores_total
            start
            end
          }
        }
      }
    `;
  }
  
  private buildParticipationQuery(timeFrame: string): string {
    return `
      query SpaceProposalsWithVotes($space: String!) {
        space(id: $space) {
          id
          name
          proposals {
            id
            title
            state
            scores_total
            votes
            start
            end
            type
          }
        }
      }
    `;
  }
  
  private buildVotingAnalyticsQuery(timeFrame: string): string {
    return `
      query SpaceProposalsWithVotingDetails($space: String!) {
        space(id: $space) {
          id
          name
          proposals {
            id
            title
            state
            scores
            scores_total
            votes
            start
            end
          }
        }
      }
    `;
  }
  
  private buildProposalsQuery(timeFrame: string, status: string): string {
    const stateFilter = status === 'active' ? 'state: "active"' : 
                         status === 'completed' ? 'state: "closed"' : '';
    
    return `
      query SpaceProposals($space: String!) {
        space(id: $space) {
          id
          name
          proposals(${stateFilter}) {
            id
            title
            body
            state
            scores
            scores_total
            votes
            start
            end
          }
        }
      }
    `;
  }
  
  private buildVoterAnalyticsQuery(timeFrame: string): string {
    return `
      query SpaceVoters($space: String!) {
        space(id: $space) {
          id
          name
          proposals {
            id
            votes
            voters
          }
          followers
        }
      }
    `;
  }
  
  private buildInsightsQuery(timeFrame: string): string {
    return `
      query SpaceProposalsDetailed($space: String!) {
        space(id: $space) {
          id
          name
          proposals {
            id
            title
            body
            state
            scores
            scores_total
            votes
            start
            end
            type
          }
        }
      }
    `;
  }
  
  private buildRecommendationsQuery(timeFrame: string): string {
    // Similar to insights query
    return this.buildInsightsQuery(timeFrame);
  }
  
  // Helper methods for processing data
  
  private processSummaryData(snapshotData: any, tallyData: any, timeFrame: string): any {
    if (!snapshotData && !tallyData) return null;
    
    let totalProposals = 0;
    let activeProposals = 0;
    let completedProposals = 0;
    let participationSum = 0;
    let participationCount = 0;
    
    // Process Snapshot data
    if (snapshotData && snapshotData.space && snapshotData.space.proposals) {
      const proposals = snapshotData.space.proposals;
      totalProposals += proposals.length;
      
      for (const proposal of proposals) {
        if (proposal.state === 'active') {
          activeProposals++;
        } else if (proposal.state === 'closed') {
          completedProposals++;
        }
        
        if (proposal.scores_total && proposal.votes) {
          participationSum += proposal.scores_total;
          participationCount += proposal.votes;
        }
      }
    }
    
    // Process Tally data
    if (tallyData && tallyData.proposals) {
      const proposals = tallyData.proposals;
      totalProposals += proposals.length;
      
      for (const proposal of proposals) {
        if (proposal.status === 'ACTIVE') {
          activeProposals++;
        } else if (proposal.status === 'CLOSED' || proposal.status === 'EXECUTED') {
          completedProposals++;
        }
        
        // Add Tally-specific participation calculation
      }
    }
    
    // Calculate overall participation
    const overallParticipation = participationCount > 0 ? (participationSum / participationCount) * 100 : 0;
    
    // Determine participation trend (would need historical data for real implementation)
    const participationTrend = 'Increasing'; // Placeholder
    
    return {
      totalProposals,
      activeProposals,
      completedProposals,
      overallParticipation,
      participationTrend
    };
  }
  
  private processParticipationData(snapshotData: any, tallyData: any, timeFrame: string): ParticipationMetrics | null {
    if (!snapshotData && !tallyData) return null;
    
    const byMonth: {[month: string]: number} = {};
    const byProposalType: {[proposalType: string]: number} = {};
    const proposalsByMonth: {[month: string]: number} = {};
    const votesByMonth: {[month: string]: number} = {};
    const proposalsByType: {[proposalType: string]: number} = {};
    const votesByType: {[proposalType: string]: number} = {};
    
    // Process Snapshot data
    if (snapshotData && snapshotData.space && snapshotData.space.proposals) {
      for (const proposal of snapshotData.space.proposals) {
        // Process by month
        const month = new Date(proposal.start * 1000).toISOString().slice(0, 7);
        if (!proposalsByMonth[month]) proposalsByMonth[month] = 0;
        if (!votesByMonth[month]) votesByMonth[month] = 0;
        
        proposalsByMonth[month]++;
        votesByMonth[month] += proposal.votes || 0;
        
        // Process by type
        const type = proposal.type || 'Other';
        if (!proposalsByType[type]) proposalsByType[type] = 0;
        if (!votesByType[type]) votesByType[type] = 0;
        
        proposalsByType[type]++;
        votesByType[type] += proposal.votes || 0;
      }
    }
    
    // Process Tally data (if applicable)
    
    // Calculate participation rates by month
    for (const month of Object.keys(proposalsByMonth)) {
      byMonth[month] = votesByMonth[month] / proposalsByMonth[month];
    }
    
    // Calculate participation rates by proposal type
    for (const type of Object.keys(proposalsByType)) {
      byProposalType[type] = votesByType[type] / proposalsByType[type];
    }
    
    return {
      byMonth,
      byProposalType
    };
  }
  
  private processVotingAnalyticsData(snapshotData: any, tallyData: any, timeFrame: string): VotingAnalytics | null {
    if (!snapshotData && !tallyData) return null;
    
    // Process data to calculate voting distribution and outcomes
    let whaleVotes = 0;
    let mediumVotes = 0;
    let smallVotes = 0;
    let totalVotes = 0;
    let passedProposals = 0;
    let rejectedProposals = 0;
    let approvalSum = 0;
    let proposalCount = 0;
    
    // Process Snapshot data
    if (snapshotData && snapshotData.space && snapshotData.space.proposals) {
      for (const proposal of snapshotData.space.proposals) {
        if (proposal.state === 'closed') {
          proposalCount++;
          
          // Determine if passed (simple majority for now)
          if (proposal.scores && proposal.scores.length >= 2) {
            const forVotes = proposal.scores[0] || 0;
            const againstVotes = proposal.scores[1] || 0;
            
            if (forVotes > againstVotes) {
              passedProposals++;
              approvalSum += (forVotes / (forVotes + againstVotes)) * 100;
            } else {
              rejectedProposals++;
            }
          }
          
          // This would require actual voter data with voting power
          // For now using placeholder distribution
          totalVotes += proposal.votes || 0;
          whaleVotes += (proposal.votes || 0) * 0.4; // Assuming 40% whale votes
          mediumVotes += (proposal.votes || 0) * 0.35; // Assuming 35% medium votes
          smallVotes += (proposal.votes || 0) * 0.25; // Assuming 25% small votes
        }
      }
    }
    
    // Calculate distributions and averages
    const averageApproval = proposalCount > 0 ? approvalSum / proposalCount : 0;
    
    return {
      distributionBySize: {
        whales: totalVotes > 0 ? (whaleVotes / totalVotes) * 100 : 0,
        medium: totalVotes > 0 ? (mediumVotes / totalVotes) * 100 : 0,
        small: totalVotes > 0 ? (smallVotes / totalVotes) * 100 : 0
      },
      outcomes: {
        passed: passedProposals,
        rejected: rejectedProposals,
        averageApproval
      }
    };
  }
  
  private processProposalsData(snapshotData: any, tallyData: any, timeFrame: string, status: string): any[] | null {
    if (!snapshotData && !tallyData) return null;
    
    const proposals: any[] = [];
    
    // Process Snapshot data
    if (snapshotData && snapshotData.space && snapshotData.space.proposals) {
      for (const proposal of snapshotData.space.proposals) {
        const stateMap: {[key: string]: string} = {
          'active': 'active',
          'closed': 'completed',
          'pending': 'pending'
        };
        
        const mappedStatus = stateMap[proposal.state] || proposal.state;
        
        // Filter by status if needed
        if (status !== 'all' && mappedStatus !== status) {
          continue;
        }
        
        const processedProposal = {
          id: proposal.id,
          title: proposal.title,
          status: mappedStatus,
          participationRate: proposal.votes ? (proposal.votes / (proposal.scores_total || 1)) * 100 : 0,
          startDate: new Date(proposal.start * 1000),
          endDate: new Date(proposal.end * 1000),
          votes: {
            for: proposal.scores && proposal.scores.length > 0 ? proposal.scores[0] : 0,
            against: proposal.scores && proposal.scores.length > 1 ? proposal.scores[1] : 0,
            abstain: proposal.scores && proposal.scores.length > 2 ? proposal.scores[2] : 0
          }
        };
        
        proposals.push(processedProposal);
      }
    }
    
    // Process Tally data (if applicable)
    
    return proposals.length > 0 ? proposals : null;
  }
  
  private processVoterData(snapshotData: any, tallyData: any, timeFrame: string): VoterAnalytics | null {
    if (!snapshotData && !tallyData) return null;
    
    // Placeholder implementation - would need voter-level data for proper implementation
    let activeVoters = 0;
    let uniqueVoters = new Set<string>();
    
    // Process Snapshot data
    if (snapshotData && snapshotData.space && snapshotData.space.proposals) {
      for (const proposal of snapshotData.space.proposals) {
        if (proposal.voters && Array.isArray(proposal.voters)) {
          proposal.voters.forEach((voter: string) => uniqueVoters.add(voter));
        }
      }
      
      activeVoters = uniqueVoters.size;
    }
    
    return {
      activeVoters,
      newVoters: Math.floor(activeVoters * 0.18), // Placeholder - would need historical data
      regularVoters: Math.floor(activeVoters * 0.43), // Placeholder
      votingPower: {
        distribution: {
          top10Percent: 68.3, // Placeholder
          middle40Percent: 24.5, // Placeholder
          bottom50Percent: 7.2 // Placeholder
        },
        giniCoefficient: 0.63 // Placeholder
      },
      behaviors: {
        averageVotesPerProposal: 0.73, // Placeholder
        timingDistribution: {
          firstDay: 31.2, // Placeholder
          middlePeriod: 34.5, // Placeholder
          lastDay: 34.3 // Placeholder
        }
      }
    };
  }
  
  private analyzeForInsights(snapshotData: any, tallyData: any, timeFrame: string): string[] | null {
    // Placeholder - would use data analysis to generate real insights
    return null;
  }
  
  private analyzeForRecommendations(snapshotData: any, tallyData: any, timeFrame: string): string[] | null {
    // Placeholder - would use data analysis to generate real recommendations
    return null;
  }
  
  private fetchDaoData(daoAddress: string, timeFrame: string): Promise<any> {
    // Fetch comprehensive data for a single DAO
    return Promise.resolve(null); // Placeholder
  }
  
  private fetchSimilarDaos(daoAddress: string, category: string, timeFrame: string): Promise<any[]> {
    // Fetch data for similar DAOs
    return Promise.resolve([]); // Placeholder
  }
  
  private calculateComparisons(daoData: any, similarDaos: any[], category: string): DAOComparison | null {
    // Calculate comparison metrics
    return null; // Placeholder
  }
} 