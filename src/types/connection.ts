export type ConnectionResult = 
  | {
    status: 'connected';
    ip: string;
  }
  | {
    status: 'unreachable';
    ip:string;
  }
  | {
    status: 'invalid';
    message: string;
  };

export type ConnectionLog = {
  id: string;
  device_name: string;
  entered_address: string;
  result_status: 'connected' | 'unreachable' | 'invalid';
  created_at: string;
};