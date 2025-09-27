import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Brain, 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Database, 
  Target,
  Route,
  Phone,
  Heart,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Cpu,
  BarChart3,
  Shield
} from "lucide-react";
import { useAgenticAI } from "@/services/AgenticAI";

const ViewAIResponse = () => {
  const [searchParams] = useSearchParams();
  const { decisions, viewAIResponse, isProcessing } = useAgenticAI();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedDecision, setSelectedDecision] = useState<any>(null);
  const [aiResponse, setAiResponse] = useState<any>(null);

  // Get decision ID from URL params if provided
  const decisionIdFromUrl = searchParams.get('decisionId');

  useEffect(() => {
    if (decisionIdFromUrl) {
      const decision = decisions.find(d => d.timestamp === decisionIdFromUrl);
      if (decision) {
        setSelectedDecision(decision);
        const response = viewAIResponse(decisionIdFromUrl);
        setAiResponse(response);
      }
    }
  }, [decisionIdFromUrl, decisions, viewAIResponse]);

  const handleViewResponse = (decisionId: string) => {
    const decision = decisions.find(d => d.timestamp === decisionId);
    if (decision) {
      setSelectedDecision(decision);
      const response = viewAIResponse(decisionId);
      setAiResponse(response);
    }
  };

  const filteredDecisions = decisions.filter(decision => {
    const matchesSearch = decision.reasoning.some(reason => 
      reason.toLowerCase().includes(searchTerm.toLowerCase())
    ) || decision.action.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || decision.action === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'match': return <Target className="h-4 w-4" />;
      case 'inventory_alert': return <AlertTriangle className="h-4 w-4" />;
      case 'emergency_outreach': return <Phone className="h-4 w-4" />;
      case 'logistics_optimization': return <Route className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'match': return 'text-blue-600 bg-blue-50';
      case 'inventory_alert': return 'text-red-600 bg-red-50';
      case 'emergency_outreach': return 'text-orange-600 bg-orange-50';
      case 'logistics_optimization': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatActionName = (action: string) => {
    return action.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/ai-agent" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to AI Dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">UBlood AI</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Eye className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">AI Response Viewer</h1>
          </div>
          <p className="text-muted-foreground">
            Detailed analysis and reasoning behind AI decisions and recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Decision List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>AI Decisions</span>
                  <Badge variant="secondary">{filteredDecisions.length}</Badge>
                </CardTitle>
                <CardDescription>
                  Browse through AI decisions and responses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filter */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search decisions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="match">Matches</option>
                    <option value="inventory_alert">Inventory Alerts</option>
                    <option value="emergency_outreach">Emergency Outreach</option>
                    <option value="logistics_optimization">Logistics</option>
                  </select>
                </div>

                {/* Decision List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredDecisions.map((decision, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedDecision?.timestamp === decision.timestamp
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => handleViewResponse(decision.timestamp)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${getActionColor(decision.action)}`}>
                          {getActionIcon(decision.action)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium truncate">
                              {formatActionName(decision.action)}
                            </h4>
                            <Badge variant={decision.confidence > 0.9 ? 'destructive' : 'secondary'} className="text-xs">
                              {Math.round(decision.confidence * 100)}%
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {decision.reasoning[0]}
                          </p>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(decision.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredDecisions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Brain className="h-12 w-12 mx-auto mb-4" />
                      <div className="text-sm">No decisions found matching your criteria</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Response View */}
          <div className="lg:col-span-2">
            {aiResponse ? (
              <div className="space-y-6">
                {/* Response Header */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg ${getActionColor(selectedDecision.action)}`}>
                          {getActionIcon(selectedDecision.action)}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{formatActionName(selectedDecision.action)}</h2>
                          <p className="text-sm text-muted-foreground">
                            Generated on {new Date(selectedDecision.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant={selectedDecision.confidence > 0.9 ? 'destructive' : 'secondary'}>
                        {Math.round(selectedDecision.confidence * 100)}% Confidence
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                </Card>

                {/* Algorithm Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Cpu className="h-5 w-5 text-primary" />
                      <span>Algorithm Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Brain className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <div className="text-sm font-medium">Algorithm</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {aiResponse.detailedAnalysis.algorithmUsed}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-sm font-medium">Processing Time</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {aiResponse.detailedAnalysis.processingTime}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <div className="text-sm font-medium">Data Points</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {aiResponse.detailedAnalysis.dataPoints} analyzed
                        </div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Shield className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                        <div className="text-sm font-medium">Risk Level</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {aiResponse.detailedAnalysis.riskAssessment}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Confidence Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span>Confidence Factors</span>
                    </CardTitle>
                    <CardDescription>
                      Detailed reasoning behind the AI's confidence level
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-medium">Overall Confidence</span>
                        <span className="font-bold text-lg">{Math.round(selectedDecision.confidence * 100)}%</span>
                      </div>
                      <Progress value={selectedDecision.confidence * 100} className="h-3 mb-6" />
                      
                      <div className="space-y-3">
                        {aiResponse.detailedAnalysis.confidenceFactors.map((factor: string, index: number) => (
                          <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm">{factor}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary" />
                      <span>AI Recommendations</span>
                    </CardTitle>
                    <CardDescription>
                      Suggested actions based on the analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {aiResponse.detailedAnalysis.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{rec}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <Link to="/apply-optimization" className="w-full sm:w-auto">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Route className="h-4 w-4 mr-2" />
                      Apply Optimization
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => window.print()}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <Eye className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Select a Decision</h3>
                  <p className="text-muted-foreground">
                    Choose an AI decision from the list to view detailed analysis and reasoning
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAIResponse;