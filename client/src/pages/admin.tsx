import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Users, FileText, CheckCircle, XCircle, Clock, User, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface AdminStats {
  total: number;
  pending: number;
  testing: number;
  approved: number;
  rejected: number;
  byRole: {
    nurse: number;
    midwife: number;
    caregiver: number;
  };
}

interface ApplicationWithUser {
  id: string;
  role: string;
  status: string;
  passportUrl: string | null;
  credentialsUrl: string | null;
  testScore: number | null;
  testCompleted: boolean;
  submittedAt: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    dateOfBirth: string;
    experience: string;
  } | null;
  test?: {
    score: number;
    completed: boolean;
  } | null;
}

export default function AdminDashboard() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const { toast } = useToast();

  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: applications, isLoading: applicationsLoading } = useQuery<ApplicationWithUser[]>({
    queryKey: ["/api/admin/applications"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest("PATCH", `/api/admin/applications/${id}/status`, { status });
    },
    onSuccess: () => {
      toast({
        title: "Status Updated",
        description: "Application status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/applications"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredApplications = applications?.filter(app => 
    selectedStatus === "all" || app.status === selectedStatus
  ) || [];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "outline",
      testing: "secondary", 
      approved: "default",
      rejected: "destructive"
    } as const;
    
    const colors = {
      pending: "text-yellow-600",
      testing: "text-blue-600",
      approved: "text-green-600", 
      rejected: "text-red-600"
    };

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"} className={colors[status as keyof typeof colors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'nurse': return <User className="h-4 w-4" />;
      case 'midwife': return <Users className="h-4 w-4" />;
      case 'caregiver': return <FileText className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  if (statsLoading || applicationsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="admin-title">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Manage healthcare recruitment applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card data-testid="stat-total">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total || 0}</div>
            </CardContent>
          </Card>

          <Card data-testid="stat-pending">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats?.pending || 0}</div>
            </CardContent>
          </Card>

          <Card data-testid="stat-approved">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats?.approved || 0}</div>
            </CardContent>
          </Card>

          <Card data-testid="stat-rejected">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats?.rejected || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Role Stats */}
        <Card className="mb-8" data-testid="role-stats">
          <CardHeader>
            <CardTitle>Applications by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats?.byRole.nurse || 0}</div>
                <p className="text-sm text-muted-foreground">Nurses</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{stats?.byRole.midwife || 0}</div>
                <p className="text-sm text-muted-foreground">Midwives</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{stats?.byRole.caregiver || 0}</div>
                <p className="text-sm text-muted-foreground">Caregivers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card data-testid="applications-table">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Applications</CardTitle>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]" data-testid="status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Test Score</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id} data-testid={`application-${application.id}`}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.user?.fullName || 'N/A'}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {application.user?.email || 'N/A'}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {application.user?.phone || 'N/A'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(application.role)}
                        <span className="capitalize">{application.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="capitalize">{application.user?.country || 'N/A'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(application.status)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          {application.passportUrl ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : (
                            <XCircle className="h-3 w-3 text-red-600" />
                          )}
                          <span className="text-sm">Passport</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {application.credentialsUrl ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : (
                            <XCircle className="h-3 w-3 text-red-600" />
                          )}
                          <span className="text-sm">Credentials</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {application.testCompleted ? (
                        <Badge variant={application.testScore && application.testScore >= 70 ? "default" : "destructive"}>
                          {application.testScore}%
                        </Badge>
                      ) : application.role === 'caregiver' ? (
                        <Badge variant="outline">Pending</Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-sm">
                          {new Date(application.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={application.status}
                        onValueChange={(status) => updateStatusMutation.mutate({ id: application.id, status })}
                        disabled={updateStatusMutation.isPending}
                      >
                        <SelectTrigger className="w-[120px]" data-testid={`status-${application.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="testing">Testing</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredApplications.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No applications found for the selected status.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}