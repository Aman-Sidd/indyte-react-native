import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://zvmnljngahbykmjitsrr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2bW5sam5nYWhieWttaml0c3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzNTA3MDQsImV4cCI6MjAyNDkyNjcwNH0.FqodqEkuu4SfrmJ_d7MoeJMQDJ2mnrkyqsKV6H0Qk5E';

export const supabase = createClient(supabaseUrl, supabaseKey);