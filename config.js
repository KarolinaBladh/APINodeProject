const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.APP_SUPABASE_URL;
const supabaseKey = process.env.APP_SUPABASE_KEY;

module.exports = createClient(supabaseUrl, supabaseKey);
