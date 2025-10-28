export interface JWTPayload {
    userId: string;
    tenantId: string;
    email: string;
    role: 'owner' | 'admin' | 'member' | 'viewer';
    iat: number;
    exp: number;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    token: string;
    refreshToken: string;
    user: User;
}
export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    workspaceName: string;
}
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    status: 'active' | 'inactive';
    emailVerified: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserProfile {
    id: string;
    userId: string;
    bio?: string;
    phone?: string;
    timezone?: string;
    preferences: Record<string, any>;
}
export interface Workspace {
    id: string;
    tenantId: string;
    name: string;
    slug: string;
    logoUrl?: string;
    description?: string;
    ownerId: string;
    subscriptionTier: 'free' | 'pro' | 'enterprise';
    status: 'active' | 'inactive' | 'suspended';
    createdAt: Date;
    updatedAt: Date;
}
export interface WorkspaceMember {
    id: string;
    userId: string;
    workspaceId: string;
    role: 'owner' | 'admin' | 'member' | 'viewer';
    joinedAt: Date;
}
export interface WorkspaceInvitation {
    id: string;
    email: string;
    workspaceId: string;
    role: 'admin' | 'member' | 'viewer';
    invitedBy: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: Date;
    expiresAt: Date;
}
export interface Project {
    id: string;
    workspaceId: string;
    name: string;
    description?: string;
    ownerId: string;
    status: 'active' | 'archived' | 'completed';
    startDate?: Date;
    endDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface Task {
    id: string;
    projectId: string;
    title: string;
    description?: string;
    status: 'todo' | 'in_progress' | 'done';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    assignedTo?: string;
    createdBy: string;
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface TaskComment {
    id: string;
    taskId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Notification {
    id: string;
    userId: string;
    type: 'task_assigned' | 'comment_mentioned' | 'task_updated' | 'team_invite';
    title: string;
    message: string;
    relatedTaskId?: string;
    isRead: boolean;
    createdAt: Date;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: ApiError;
}
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
}
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
export interface RequestContext {
    userId: string;
    tenantId: string;
    email: string;
    role: 'owner' | 'admin' | 'member' | 'viewer';
    workspaceId: string;
}
export interface LoggerConfig {
    serviceName: string;
    logLevel: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
    environment?: 'development' | 'production';
    enableConsole?: boolean;
    enableFile?: boolean;
}
export interface LogEntry {
    timestamp: string;
    level: string;
    message: string;
    service: string;
    data?: any;
}
//# sourceMappingURL=index.d.ts.map