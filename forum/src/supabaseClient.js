import { createClient } from '@supabase/supabase-js'


const URL = 'https://vriomvqxtvhsimcxgigx.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyaW9tdnF4dHZoc2ltY3hnaWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODQyODAsImV4cCI6MjA2MDc2MDI4MH0.TbtcvTahwkVXY6u6xFsGwVqG9kGRlHCuUuAewctQIBo';

export const supabase = createClient(URL, API_KEY);
