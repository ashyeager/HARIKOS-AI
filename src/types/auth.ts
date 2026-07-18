export interface AuthUser {
  id: string;
  uid?: string;
  email?: string | null;
  displayName?: string | null;
  display_name?: string | null;
  photoURL?: string | null;
  avatar_url?: string | null;
  user_metadata?: Record<string, unknown>;
  app_metadata?: Record<string, unknown>;
  created_at?: string;
}
