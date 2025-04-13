import { Request, Response } from 'express';
import { AnalyticsService } from '../services/analytics.service';
import { AnalyticsQueryParams, ProposalsQueryParams, ComparisonQueryParams } from '../interfaces/analytics';

/**
 * Controller for handling analytics API routes
 */
export class AnalyticsController {
  private analyticsService: AnalyticsService;
  
  constructor() {
    this.analyticsService = new AnalyticsService();
  }
  
  /**
   * Get governance analytics overview
   */
  public getAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
      const { daoAddress, timeFrame, platforms } = req.query;
      
      // Validate required parameters
      if (!daoAddress) {
        res.status(400).json({
          error: 'Bad request',
          message: 'daoAddress parameter is required'
        });
        return;
      }
      
      // Prepare query params
      const params: AnalyticsQueryParams = {
        daoAddress: daoAddress as string,
        timeFrame: timeFrame as 'week' | 'month' | 'quarter' | 'year' | undefined,
        platforms: platforms as string
      };
      
      // Get analytics data
      const analyticsData = await this.analyticsService.getAnalytics(params);
      
      // Return success response
      res.status(200).json({
        status: 'success',
        data: analyticsData
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'An error occurred while fetching analytics data'
      });
    }
  };
  
  /**
   * Get detailed proposal analytics
   */
  public getProposalAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
      const { daoAddress, timeFrame, status } = req.query;
      
      // Validate required parameters
      if (!daoAddress) {
        res.status(400).json({
          error: 'Bad request',
          message: 'daoAddress parameter is required'
        });
        return;
      }
      
      // Prepare query params
      const params: ProposalsQueryParams = {
        daoAddress: daoAddress as string,
        timeFrame: timeFrame as 'week' | 'month' | 'quarter' | 'year' | undefined,
        status: status as 'active' | 'completed' | 'all' | undefined
      };
      
      // Get proposal analytics data
      const proposalData = await this.analyticsService.getProposalAnalytics(params);
      
      // Return success response
      res.status(200).json({
        status: 'success',
        data: proposalData
      });
    } catch (error) {
      console.error('Error fetching proposal analytics:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'An error occurred while fetching proposal analytics data'
      });
    }
  };
  
  /**
   * Get voter analytics
   */
  public getVoterAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
      const { daoAddress, timeFrame } = req.query;
      
      // Validate required parameters
      if (!daoAddress) {
        res.status(400).json({
          error: 'Bad request',
          message: 'daoAddress parameter is required'
        });
        return;
      }
      
      // Get voter analytics data
      const voterData = await this.analyticsService.getVoterAnalytics(
        daoAddress as string,
        timeFrame as string
      );
      
      // Return success response
      res.status(200).json({
        status: 'success',
        data: voterData
      });
    } catch (error) {
      console.error('Error fetching voter analytics:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'An error occurred while fetching voter analytics data'
      });
    }
  };
  
  /**
   * Compare DAO against similar DAOs
   */
  public getComparison = async (req: Request, res: Response): Promise<void> => {
    try {
      const { daoAddress, category, metrics, timeFrame } = req.query;
      
      // Validate required parameters
      if (!daoAddress) {
        res.status(400).json({
          error: 'Bad request',
          message: 'daoAddress parameter is required'
        });
        return;
      }
      
      // Prepare query params
      const params: ComparisonQueryParams = {
        daoAddress: daoAddress as string,
        category: category as 'defi' | 'social' | 'metaverse' | 'protocol' | 'investment' | undefined,
        timeFrame: timeFrame as 'week' | 'month' | 'quarter' | 'year' | undefined,
        metrics: metrics as string
      };
      
      // Get comparison data
      const comparisonData = await this.analyticsService.getComparison(params);
      
      // Return success response
      res.status(200).json({
        status: 'success',
        data: comparisonData
      });
    } catch (error) {
      console.error('Error fetching comparison data:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'An error occurred while fetching comparison data'
      });
    }
  };
} 