import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cenoontwipphuwcortje.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlbm9vbnR3aXBwaHV3Y29ydGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5Mzc4MTAsImV4cCI6MjA4MjUxMzgxMH0.1sr8uNJ6Pk4ogpSwbgQKwOT94oJA5N6kabwCOfJ5Sv0'

export const supabase = createClient(supabaseUrl, supabaseKey)