// supabase.js - Dedicated database connection para sa ByaheGo
const SUPABASE_URL = 'https://nuweuyerawplhvjycfax.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_mfR8VESrrzn1tGxn8dvoaQ_uxC6f-5m';

// Gumawa ng global client (walang conflict sa ibang script)
window.byaheDb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function para kunin ang barangays at taripa
window.fetchByaheGoData = async function () {
  try {
    const [brgyRes, fareRes] = await Promise.all([
      window.byaheDb.from('barangays').select('*').order('barangay_name', { ascending: true }),
      window.byaheDb.from('fare_rates').select('*')
    ]);

    if (brgyRes.error) throw brgyRes.error;
    if (fareRes.error) throw fareRes.error;

    return {
      success: true,
      barangays: brgyRes.data || [],
      fareRates: fareRes.data || []
    };
  } catch (err) {
    console.error('Supabase connection error:', err.message || err);
    return { success: false, barangays: [], fareRates: [] };
  }
};
