
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Dummy data for roles and permissions
const roles = ["admin", "moderator", "user"];
const permissionGroups = {
  users: [
    { id: "users.view", label: "View Users" },
    { id: "users.create", label: "Create Users" },
    { id: "users.edit", label: "Edit Users" },
    { id: "users.delete", label: "Delete Users" },
  ],
  documents: [
    { id: "documents.view", label: "View Documents" },
    { id: "documents.upload", label: "Upload Documents" },
    { id: "documents.approve", label: "Approve Documents" },
    { id: "documents.delete", label: "Delete Documents" },
  ],
  applications: [
    { id: "applications.view", label: "View Applications" },
    { id: "applications.process", label: "Process Applications" },
    { id: "applications.approve", label: "Approve Applications" },
    { id: "applications.reject", label: "Reject Applications" },
  ],
};

const RolePermissions = () => {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [rolePermissions, setRolePermissions] = useState<Record<string, Record<string, boolean>>>({
    admin: Object.keys(permissionGroups).reduce((acc, group) => ({
      ...acc,
      ...permissionGroups[group as keyof typeof permissionGroups].reduce((groupAcc, perm) => ({
        ...groupAcc,
        [perm.id]: true,
      }), {}),
    }), {}),
    moderator: {},
    user: {},
  });

  const handlePermissionChange = (permissionId: string) => {
    setRolePermissions(prev => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [permissionId]: !prev[selectedRole][permissionId],
      },
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Role Permissions</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage permissions for each role
          </p>
        </div>

        <div className="flex gap-4 flex-wrap">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-md ${
                selectedRole === role
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          {Object.entries(permissionGroups).map(([group, permissions]) => (
            <Card key={group} className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="capitalize">{group}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${selectedRole}-${permission.id}`}
                        checked={rolePermissions[selectedRole][permission.id] || false}
                        onCheckedChange={() => handlePermissionChange(permission.id)}
                      />
                      <Label htmlFor={`${selectedRole}-${permission.id}`}>
                        {permission.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RolePermissions;
