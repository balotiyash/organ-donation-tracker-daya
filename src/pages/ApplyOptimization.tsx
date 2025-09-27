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
  Zap, 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  Play, 
  Pause,
  Target,
  Route,
  Phone,
  Heart,
  Truck,
  Users,
  BarChart3,
  DollarSign,
  Leaf,
  Timer,
  RefreshCw,
  Settings,
  Activity,
  Bell,
  Shield
} from "lucide-react";
import { useAgenticAI } from "@/services/AgenticAI";

const ApplyOptimization = () => {
  const [searchParams] = useSearchParams();
  const { decisions, applyOptimization, isProcessing } = useAgenticAI();
  const [selectedOptimization, setSelectedOptimization] = useState<any>(null);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [appliedOptimizations, setAppliedOptimizations] = useState<any[]>([]);

  // Get decision ID from URL params if provided
  const decisionIdFromUrl = searchParams.get('decisionId');

  useEffect(() => {
    if (decisionIdFromUrl) {
      const decision = decisions.find(d => d.timestamp === decisionIdFromUrl);
      if (decision) {
        setSelectedOptimization(decision);
      }
    }
  }, [decisionIdFromUrl, decisions]);

  const handleApplyOptimization = async (decisionId: string) => {
    setIsApplying(true);
    try {
      const result = await applyOptimization(decisionId);
      setOptimizationResult(result);
      
      if (result.success) {
        setAppliedOptimizations(prev => [...prev, {
          decisionId,
          result,
          timestamp: new Date().toISOString()
        }]);
      }
    } catch (error) {
      setOptimizationResult({
        success: false,
        message: 'Failed to apply optimization: ' + (error as Error).message
      });
    } finally {
      setIsApplying(false);
    }
  };

  const optimizableDecisions = decisions.filter(d => 
    d.confidence > 0.7 && 
    (d.action === 'inventory_alert' || d.action === 'logistics_optimization' || d.action === 'emergency_outreach')
  );

  const getOptimizationIcon = (action: string) => {
    switch (action) {
      case 'inventory_alert': return <AlertTriangle className="h-5 w-5" />;
      case 'emergency_outreach': return <Phone className="h-5 w-5" />;
      case 'logistics_optimization': return <Route className="h-5 w-5" />;
      default: return <Zap className="h-5 w-5" />;
    }
  };

  const getOptimizationColor = (action: string) => {
    switch (action) {
      case 'inventory_alert': return 'text-red-600 bg-red-50 border-red-200';
      case 'emergency_outreach': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'logistics_optimization': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getOptimizationTitle = (action: string) => {
    switch (action) {
      case 'inventory_alert': return 'Inventory Optimization';
      case 'emergency_outreach': return 'Emergency Response Optimization';
      case 'logistics_optimization': return 'Logistics Route Optimization';
      default: return 'System Optimization';
    }
  };

  const getOptimizationDescription = (action: string) => {
    switch (action) {
      case 'inventory_alert': return 'Optimize blood inventory management and donor outreach';
      case 'emergency_outreach': return 'Enhance emergency response protocols and donor notifications';
      case 'logistics_optimization': return 'Improve delivery routes and transportation efficiency';
      default: return 'Apply general system optimizations';
    }
  };

  const getPotentialBenefits = (action: string) => {
    switch (action) {
      case 'inventory_alert': return {
        timeSaved: '15-30 minutes',
        costReduction: '$500-1,500',
        efficiency: '25-40%',
        impact: 'High'
      };
      case 'emergency_outreach': return {
        responseFaster: '40-60%',
        reachMore: '200-500 donors',
        efficiency: '35-50%',
        impact: 'Critical'
      };
      case 'logistics_optimization': return {
        distanceReduced: '20-35%',
        fuelSaved: '10-25 gallons',
        efficiency: '30-45%',
        impact: 'Medium'
      };
      default: return {
        efficiency: '15-25%',
        impact: 'Low'
      };
    }
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
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Zap className="h-8 w-8 text-primary animate-pulse" />
                <h1 className="text-3xl font-bold text-foreground">Apply AI Optimization</h1>
              </div>
              <p className="text-muted-foreground">
                Execute AI-recommended optimizations to improve system efficiency and save lives
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Active Optimizations</div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {appliedOptimizations.length}
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Available Optimizations</span>
            </TabsTrigger>
            <TabsTrigger value="applying" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Apply & Monitor</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Results & Impact</span>
            </TabsTrigger>
          </TabsList>

          {/* Available Optimizations */}
          <TabsContent value="available">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {optimizableDecisions.map((decision, index) => (
                <Card key={index} className={`border-2 ${getOptimizationColor(decision.action)} transition-all hover:shadow-lg`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getOptimizationIcon(decision.action)}
                        <span className="text-lg">{getOptimizationTitle(decision.action)}</span>
                      </div>
                      <Badge variant={decision.confidence > 0.9 ? 'destructive' : 'secondary'}>
                        {Math.round(decision.confidence * 100)}%
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {getOptimizationDescription(decision.action)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      <p className="line-clamp-2">{decision.reasoning[0]}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {Object.entries(getPotentialBenefits(decision.action)).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-background rounded">
                          <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                          <div className="text-muted-foreground">{value}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          setSelectedOptimization(decision);
                          handleApplyOptimization(decision.timestamp);
                        }}
                        disabled={isApplying || appliedOptimizations.some(opt => opt.decisionId === decision.timestamp)}
                      >
                        {appliedOptimizations.some(opt => opt.decisionId === decision.timestamp) ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Applied
                          </>
                        ) : isApplying && selectedOptimization?.timestamp === decision.timestamp ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Applying...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Apply Optimization
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {optimizableDecisions.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Shield className="h-16 w-16 mx-auto mb-4 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-600 mb-2">System Optimized</h3>
                  <p className="text-muted-foreground">
                    No optimization opportunities available at the moment
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Apply & Monitor */}
          <TabsContent value="applying">
            <div className="space-y-6">
              {optimizationResult && (
                <Alert className={optimizationResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  <CheckCircle className={`h-4 w-4 ${optimizationResult.success ? 'text-green-600' : 'text-red-600'}`} />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <span>{optimizationResult.message}</span>
                      {optimizationResult.success && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Success
                        </Badge>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {selectedOptimization && optimizationResult?.success && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="h-5 w-5 text-primary" />
                        <span>Optimization Progress</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Initialization</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Data Analysis</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Implementation</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Verification</span>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <Progress value={100} className="h-3" />
                      <div className="text-sm text-center text-green-600 font-medium">
                        Optimization Complete
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <span>Real-time Metrics</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {optimizationResult.metrics && (
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(optimizationResult.metrics).map(([key, value]) => (
                            <div key={key} className="text-center p-3 bg-muted rounded-lg">
                              <div className="text-lg font-bold text-primary">{String(value)}</div>
                              <div className="text-sm text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {!selectedOptimization && (
                <Card className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Optimize</h3>
                    <p className="text-muted-foreground">
                      Select an optimization from the Available tab to begin
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Results & Impact */}
          <TabsContent value="results">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold">{appliedOptimizations.length}</div>
                        <div className="text-sm text-muted-foreground">Applied</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="text-2xl font-bold">23%</div>
                        <div className="text-sm text-muted-foreground">Time Saved</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold">$2.4K</div>
                        <div className="text-sm text-muted-foreground">Cost Saved</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="text-2xl font-bold">{appliedOptimizations.length * 3}</div>
                        <div className="text-sm text-muted-foreground">Lives Impacted</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Applied Optimizations History</CardTitle>
                  <CardDescription>
                    Track the impact and results of executed optimizations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appliedOptimizations.map((optimization, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-medium">Optimization Applied</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(optimization.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Success
                          </Badge>
                        </div>
                        
                        {optimization.result.metrics && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                            {Object.entries(optimization.result.metrics).map(([key, value]) => (
                              <div key={key} className="text-center p-2 bg-muted rounded">
                                <div className="text-sm font-medium">{String(value)}</div>
                                <div className="text-xs text-muted-foreground capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {appliedOptimizations.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                        <div className="text-lg font-semibold">No Optimizations Applied Yet</div>
                        <div className="text-sm">Results will appear here after applying optimizations</div>
                      </div>
                    )}
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

export default ApplyOptimization;