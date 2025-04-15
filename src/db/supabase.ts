import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://ksvpnmwmentvnhtfnngx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzdnBubXdtZW50dm5odGZubmd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNDk0NTcsImV4cCI6MjA1OTkyNTQ1N30.CK_SAIP52Bxkykm2Ca-KnPhQ_pQEefeSBIy-TBixUfE"
);

export {supabaseClient}