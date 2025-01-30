export interface ISession {
  id: string;
  ip_v4: string;
  ip_v6: string;
  ip_type: string;
  ip_class: string;
  isp: string;
  os: string;
  user_agent: string;
  created_at: string;
  updated_at: string;

  token_id: string;
  refresh_id: string;
  user_id: string;
}