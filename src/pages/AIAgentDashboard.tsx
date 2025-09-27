import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Zap, 
  Target, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  TrendingUp,
  Route,
  Phone,
  Heart,
  BarChart3,
  Cpu,
  Shield,
  Users,
  Truck,
  Bell,
  ArrowRight,
  RefreshCw,
  Eye,
  Play,
  Check
} from "lucide-react";
import { useAgenticAI, DonorProfile, RecipientRequest, InventoryItem, AIAgentDecision } from "@/services/AgenticAI";

const AIAgentDashboard = () => {
  const { runAIAnalysis, executeEmergencyOutreach, viewAIResponse, applyOptimization, executeMatch, decisions, matches, isProcessing, aiSystem } = useAgenticAI();
  const [aiMetrics, setAiMetrics] = useState({
    totalDecisions: 0,
    successRate: 0,
    averageResponseTime: 0,
    energySaved: 0,
    livesImpacted: 0
  });
  const [realtimeStatus, setRealtimeStatus] = useState('active');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Mock data for demonstration
  const mockDonors: DonorProfile[] = [
    {
      id: 'donor-001',
      name: 'Sarah Johnson',
      bloodType: 'O-',
      location: { lat: 40.7128, lng: -74.0060, address: '123 Main St', city: 'New York' },
      availability: {
        isAvailable: true,
        lastDonation: '2024-06-15',
        nextEligibleDate: '2024-08-15',
        preferredTimes: ['morning', 'evening']
      },
      contactInfo: { phone: '+1-555-0101', email: 'sarah@example.com', preferredMethod: 'phone' },
      medicalInfo: { weight: 65, age: 28, medicalConditions: [], medications: [] },
      donationHistory: { totalDonations: 12, lastDonationDate: '2024-06-15', reliability: 95 }
    },
    {
      id: 'donor-002',
      name: 'Michael Chen',
      bloodType: 'A+',
      location: { lat: 40.7589, lng: -73.9851, address: '456 Oak Ave', city: 'New York' },
      availability: {
        isAvailable: true,
        lastDonation: '2024-05-20',
        nextEligibleDate: '2024-07-20',
        preferredTimes: ['afternoon']
      },
      contactInfo: { phone: '+1-555-0102', email: 'michael@example.com', preferredMethod: 'email' },
      medicalInfo: { weight: 75, age: 34, medicalConditions: [], medications: [] },
      donationHistory: { totalDonations: 8, lastDonationDate: '2024-05-20', reliability: 88 }
    }
  ];

  const mockRecipients: RecipientRequest[] = [
    {
      id: 'recipient-001',
      hospitalId: 'hospital-001',
      hospitalName: 'City General Hospital',
      patientInfo: {
        bloodType: 'O-',
        urgency: 'Critical',
        medicalCondition: 'Severe trauma from car accident',
        compatibilityRequirements: ['CMV negative']
      },
      location: { lat: 40.7505, lng: -73.9934, address: '789 Medical Center Dr' },
      timeConstraints: {
        requestedAt: new Date().toISOString(),
        neededBy: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        maxWaitTime: 60
      },
      contactInfo: { primaryContact: 'Dr. Wilson', phone: '+1-555-EMERGENCY', email: 'emergency@citygen.com' }
    }
  ];

  const mockInventory: InventoryItem[] = [
    {
      id: 'inv-001',
      hospitalId: 'hospital-001',
      bloodType: 'O-',
      quantity: 3,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'City General Blood Bank',
      reservedQuantity: 1,
      criticalLevel: 5
    },
    {
      id: 'inv-002',
      hospitalId: 'hospital-002',
      bloodType: 'A+',
      quantity: 15,
      expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Metro Medical Center',
      reservedQuantity: 3,
      criticalLevel: 8
    }
  ];

  useEffect(() => {
    const runInitialAnalysis = async () => {
      const result = await runAIAnalysis(mockDonors, mockRecipients, mockInventory);
      setAiMetrics({
        totalDecisions: result.decisions.length,
        successRate: 94.5,
        averageResponseTime: 2.3,
        energySaved: 127.5,
        livesImpacted: result.matches.length
      });
      setLastUpdate(new Date());
    };

    runInitialAnalysis();

    // Set up real-time updates
    const interval = setInterval(async () => {
      if (realtimeStatus === 'active') {
        await runAIAnalysis(mockDonors, mockRecipients, mockInventory);
        setLastUpdate(new Date());
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [runAIAnalysis, realtimeStatus]);

  const getDecisionIcon = (action: string) => {
    switch (action) {
      case 'match': return <Target className="h-4 w-4" />;
      case 'inventory_alert': return <AlertTriangle className="h-4 w-4" />;
      case 'emergency_outreach': return <Phone className="h-4 w-4" />;
      case 'logistics_optimization': return <Route className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const handleViewAIResponse = (decisionId: string) => {
    window.location.href = `/view-ai-response?decisionId=${decisionId}`;
  };

  const handleApplyOptimization = async (decisionId: string) => {
    window.location.href = `/apply-optimization?decisionId=${decisionId}`;
  };

  const handleExecuteMatch = async (matchId: string) => {
    const result = await executeMatch(matchId);
    // The match execution is handled by the service
    // Results can be viewed in the dedicated pages
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">UBlood AI Agent</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${realtimeStatus === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-sm font-medium">
                  {realtimeStatus === 'active' ? 'AI Active' : 'AI Offline'}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRealtimeStatus(realtimeStatus === 'active' ? 'inactive' : 'active')}
              >
                <Zap className="h-4 w-4 mr-1" />
                {realtimeStatus === 'active' ? 'Pause AI' : 'Activate AI'}
              </Button>
              <Link to="/view-ai-response">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View AI Responses
                </Button>
              </Link>
              <Link to="/apply-optimization">
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Apply Optimizations
                </Button>
              </Link>
              <Link to="/hospital">
                <Button variant="outline" size="sm">
                  Hospital Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Brain className="h-8 w-8 text-primary animate-pulse" />
                <h1 className="text-3xl font-bold text-foreground">Agentic AI Control Center</h1>
              </div>
              <p className="text-muted-foreground">
                Autonomous AI system managing real-time donor-recipient matching, inventory optimization, and emergency response
              </p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>Last AI Analysis: {formatTimeAgo(lastUpdate)}</div>
              <div className="flex items-center space-x-1 mt-1">
                <RefreshCw className={`h-3 w-3 ${isProcessing ? 'animate-spin' : ''}`} />
                <span>{isProcessing ? 'Processing...' : 'Ready'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{aiMetrics.totalDecisions}</div>
                  <div className="text-sm text-muted-foreground">AI Decisions</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{aiMetrics.successRate}%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{aiMetrics.averageResponseTime}s</div>
                  <div className="text-sm text-muted-foreground">Avg Response</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">{aiMetrics.energySaved}km</div>
                  <div className="text-sm text-muted-foreground">Miles Saved</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">{aiMetrics.livesImpacted}</div>
                  <div className="text-sm text-muted-foreground">Lives Impacted</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="realtime" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="realtime" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Real-time Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="matches" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>AI Matches</span>
            </TabsTrigger>
            <TabsTrigger value="decisions" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>AI Decisions</span>
            </TabsTrigger>
            <TabsTrigger value="optimization" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Optimization</span>
            </TabsTrigger>
          </TabsList>

          {/* Real-time Analysis Tab */}
          <TabsContent value="realtime">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>Active AI Monitoring</span>
                  </CardTitle>
                  <CardDescription>
                    Real-time autonomous systems currently running
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span>Donor-Recipient Matching</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-purple-600" />
                      <span>Inventory Monitoring</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-green-600">Scanning</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-orange-600" />
                      <span>Emergency Outreach</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-green-600">Ready</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Route className="h-4 w-4 text-red-600" />
                      <span>Logistics Optimization</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-green-600">Optimizing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span>Critical Alerts</span>
                  </CardTitle>
                  <CardDescription>
                    High-priority situations requiring immediate AI intervention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {decisions.filter(d => d.confidence > 0.9).slice(0, 3).map((decision, index) => (
                    <Alert key={index} variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <strong className="capitalize">{decision.action.replace('_', ' ')}</strong>
                            <div className="text-sm mt-1">{decision.reasoning[0]}</div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewAIResponse(decision.timestamp)}
                              className="text-xs"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View Response
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleApplyOptimization(decision.timestamp)}
                              className="text-xs bg-blue-600 hover:bg-blue-700"
                              disabled={isProcessing}
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Apply
                            </Button>
                            <Badge variant="destructive" className="text-xs">
                              {Math.round(decision.confidence * 100)}%
                            </Badge>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                  
                  {decisions.filter(d => d.confidence > 0.9).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Shield className="h-12 w-12 mx-auto mb-4 text-green-600" />
                      <div className="text-lg font-semibold text-green-600">All Systems Normal</div>
                      <div className="text-sm">AI monitoring shows no critical issues</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Matches Tab */}
          <TabsContent value="matches">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Autonomous AI Matches</span>
                </CardTitle>
                <CardDescription>
                  Real-time donor-recipient matches found by AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matches.map((match, index) => (
                    <Card key={index} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Match Details</h4>
                            <div className="text-sm space-y-1">
                              <div>Donor ID: {match.donorId}</div>
                              <div>Recipient ID: {match.recipientId}</div>
                              <div>Distance: {match.distance.toFixed(1)}km</div>
                              <div>Travel Time: {match.estimatedTravelTime} min</div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">AI Scoring</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Compatibility</span>
                                <span className="text-sm font-medium">
                                  {Math.round(match.compatibilityScore * 100)}%
                                </span>
                              </div>
                              <Progress value={match.compatibilityScore * 100} className="h-2" />
                              <div className="flex justify-between">
                                <span className="text-sm">Overall Score</span>
                                <span className="text-sm font-medium">
                                  {Math.round(match.overallScore * 100)}%
                                </span>
                              </div>
                              <Progress value={match.overallScore * 100} className="h-2" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">AI Reasoning</h4>
                            <div className="text-sm space-y-1">
                              {match.reasoning.slice(0, 3).map((reason, i) => (
                                <div key={i} className="flex items-start space-x-1">
                                  <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>{reason}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <div className="text-sm text-muted-foreground">
                              Match confidence: {Math.round(match.overallScore * 100)}%
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewAIResponse(`match-${match.donorId}-${match.recipientId}`)}
                              className="text-xs"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View AI Analysis
                            </Button>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleExecuteMatch(`${match.donorId}-${match.recipientId}`)}
                            disabled={isProcessing}
                          >
                            <ArrowRight className="h-4 w-4 mr-1" />
                            Execute Match
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {matches.length === 0 && (
                    <div className="text-center py-12">
                      <Target className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <div className="text-lg font-semibold">No Active Matches</div>
                      <div className="text-muted-foreground">AI is continuously analyzing for optimal matches</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Decisions Tab */}
          <TabsContent value="decisions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>AI Decision History</span>
                </CardTitle>
                <CardDescription>
                  Recent autonomous decisions made by the AI system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {decisions.slice(0, 10).map((decision, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 rounded-full bg-muted">
                              {getDecisionIcon(decision.action)}
                            </div>
                            <div>
                              <div className="font-semibold capitalize">
                                {decision.action.replace('_', ' ')}
                              </div>
                              <div className="text-sm text-muted-foreground mb-2">
                                {new Date(decision.timestamp).toLocaleString()}
                              </div>
                              <div className="space-y-1">
                                {decision.reasoning.slice(0, 2).map((reason, i) => (
                                  <div key={i} className="text-sm">{reason}</div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={decision.confidence > 0.8 ? "default" : "secondary"}
                              className={getConfidenceColor(decision.confidence)}
                            >
                              {Math.round(decision.confidence * 100)}% confident
                            </Badge>
                            <div className="text-xs text-muted-foreground mt-1">
                              {decision.executionPlan.length} steps planned
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {decisions.length === 0 && (
                    <div className="text-center py-12">
                      <Brain className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <div className="text-lg font-semibold">AI Analysis in Progress</div>
                      <div className="text-muted-foreground">Decisions will appear as the AI processes data</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Optimization Tab */}
          <TabsContent value="optimization">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Route className="h-5 w-5 text-primary" />
                    <span>Logistics Optimization</span>
                  </CardTitle>
                  <CardDescription>
                    AI-driven route and resource optimization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">23%</div>
                        <div className="text-sm text-muted-foreground">Time Saved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">127.5</div>
                        <div className="text-sm text-muted-foreground">Miles Reduced</div>
                      </div>
                    </div>
                    <Progress value={75} className="h-3" />
                    <div className="text-sm text-center text-muted-foreground">
                      AI optimization running at 75% efficiency
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Network Performance</span>
                  </CardTitle>
                  <CardDescription>
                    Overall system performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Donor Response Rate</span>
                      <span className="font-semibold">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Match Success Rate</span>
                      <span className="font-semibold">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Emergency Response Time</span>
                      <span className="font-semibold">2.3 min</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIAgentDashboard;