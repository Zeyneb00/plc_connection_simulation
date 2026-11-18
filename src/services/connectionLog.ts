
import { supabase } from '../lib/supabase';
import type { ConnectionLog } from '../types/connection';

// Save one connection attempt
export async function saveConnectionAttempt(
  enteredAddress: string,
  resultStatus: ConnectionLog['result_status']
): Promise<void> {

  const { error } = await supabase
    .from('connection_logs')
    .insert({
      entered_address: enteredAddress,
      result_status: resultStatus,
    });

  if (error) {
    throw error;
  }
}

// Retrieve previous connection attempts
export async function getConnectionHistory(): Promise<ConnectionLog[]> {

  const { data, error } = await supabase
    .from('connection_logs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as ConnectionLog[];
}
