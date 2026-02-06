"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Settings2, Lock, Mail, Database, Save, LogOut, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Settings {
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  alertRecipientEmail: string;
  fromEmail: string;
  useMongodb: boolean;
  useEmail: boolean;
  mongodbUri: string;
}

export default function SettingsPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    smtpHost: "",
    smtpPort: 587,
    smtpSecure: false,
    smtpUser: "",
    smtpPass: "",
    alertRecipientEmail: "",
    fromEmail: "",
    useMongodb: false,
    useEmail: true,
    mongodbUri: "",
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleLogin = async () => {
    if (!password) {
      toast.error("Please enter password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/settings", {
        method: "GET",
        headers: {
          "x-settings-password": password.trim(),
        },
      });

      const data = await response.json();
      
      if (response.status === 200) {
        // Immediately authenticate and load settings without delay
        setIsAuthenticated(true);
        const settingsData = {
          smtpHost: data.smtpHost || "",
          smtpPort: data.smtpPort || 587,
          smtpSecure: data.smtpSecure || false,
          smtpUser: data.smtpUser || "",
          smtpPass: data.smtpPass || "",
          alertRecipientEmail: data.alertRecipientEmail || "",
          fromEmail: data.fromEmail || "",
          useMongodb: data.useMongodb || false,
          useEmail: data.useEmail !== false,
          mongodbUri: data.mongodbUri || "",
        };
        setSettings(settingsData);
        toast.success("Access granted! Settings loaded.");
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-settings-password": password,
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.warning) {
          toast.warning(data.warning, {
            description: data.message,
            duration: 5000,
          });
        } else {
          toast.success(data.message || "Settings saved successfully");
        }
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to save settings");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save settings. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof Settings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
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
              <div className="bg-blue-600/20 p-4 rounded-full">
                <Lock className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">Settings Access</h1>
              <p className="text-gray-400 text-sm">Enter password to configure application settings</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="bg-gray-800/50 border-gray-600 text-white pr-10"
                    placeholder="Enter settings password"
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
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Access Settings
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
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header Card */}
        <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <Settings2 className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Application Settings</h1>
                  <p className="text-gray-400 text-sm">Configure email and database settings</p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setIsAuthenticated(false);
                  setPassword("");
                }}
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Settings Card */}
        <Card className="bg-black/40 backdrop-blur-sm border-gray-700">
          <div className="p-6 space-y-6">
            {/* Feature Toggles */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">Feature Toggles</h2>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <Label htmlFor="useEmail" className="text-white font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-gray-400 text-xs mt-1">Send alerts via email when submissions are received</p>
                    </div>
                  </div>
                  <Switch
                    id="useEmail"
                    checked={settings.useEmail}
                    onCheckedChange={(checked) => handleChange("useEmail", checked)}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-green-400" />
                    <div>
                      <Label htmlFor="useMongodb" className="text-white font-medium">
                        MongoDB Storage
                      </Label>
                      <p className="text-gray-400 text-xs mt-1">Store submissions in MongoDB database</p>
                    </div>
                  </div>
                  <Switch
                    id="useMongodb"
                    checked={settings.useMongodb}
                    onCheckedChange={(checked) => handleChange("useMongodb", checked)}
                  />
                </div>
              </div>
            </div>

            {/* SMTP Configuration */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">SMTP Configuration</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost" className="text-white">
                    SMTP Host
                  </Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) => handleChange("smtpHost", e.target.value)}
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort" className="text-white">
                    SMTP Port
                  </Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) =>
                      handleChange("smtpPort", parseInt(e.target.value))
                    }
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="587"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                <Label htmlFor="smtpSecure" className="text-white">
                  Use SSL/TLS (Port 465)
                </Label>
                <Switch
                  id="smtpSecure"
                  checked={settings.smtpSecure}
                  onCheckedChange={(checked) => handleChange("smtpSecure", checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpUser" className="text-white">
                  SMTP Username
                </Label>
                <Input
                  id="smtpUser"
                  value={settings.smtpUser}
                  onChange={(e) => handleChange("smtpUser", e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                  placeholder="your-email@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtpPass" className="text-white">
                  SMTP Password / App Password
                </Label>
                <Input
                  id="smtpPass"
                  type="password"
                  value={settings.smtpPass}
                  onChange={(e) => handleChange("smtpPass", e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                  placeholder="Leave empty to keep current"
                />
                <p className="text-gray-400 text-xs">For Gmail, use an App Password instead of your regular password</p>
              </div>
            </div>

            {/* MongoDB Configuration */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold text-white">MongoDB Configuration</h2>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mongodbUri" className="text-white">
                  MongoDB Connection URI
                </Label>
                <Input
                  id="mongodbUri"
                  type="text"
                  value={settings.mongodbUri}
                  onChange={(e) => handleChange("mongodbUri", e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white font-mono text-sm"
                  placeholder="mongodb://localhost:27017/wallet-app or mongodb+srv://..."
                />
                <p className="text-gray-400 text-xs">MongoDB connection string for database storage. Use MongoDB Atlas or local instance.</p>
              </div>
            </div>

            {/* Email Configuration */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Email Configuration</h2>
              <div className="space-y-2">
                <Label htmlFor="alertRecipientEmail" className="text-white">
                  Alert Recipient Email
                </Label>
                <Input
                  id="alertRecipientEmail"
                  type="email"
                  value={settings.alertRecipientEmail}
                  onChange={(e) =>
                    handleChange("alertRecipientEmail", e.target.value)
                  }
                  className="bg-gray-800/50 border-gray-600 text-white"
                  placeholder="alerts@example.com"
                />
                <p className="text-gray-400 text-xs">Where to send alert notifications</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromEmail" className="text-white">
                  From Email Address
                </Label>
                <Input
                  id="fromEmail"
                  value={settings.fromEmail}
                  onChange={(e) => handleChange("fromEmail", e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                  placeholder='"Wallet Alerts" <noreply@example.com>'
                />
                <p className="text-gray-400 text-xs">Display name and email address for outgoing emails</p>
              </div>
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
