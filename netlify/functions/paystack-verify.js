// netlify/functions/paystack-verify.js
// Verifies payment with Paystack and updates Supabase - keys from env only

const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
  const SUPABASE_URL    = process.env.SUPABASE_URL;
  const SUPABASE_KEY    = process.env.SUPABASE_SERVICE_KEY;

  if (!PAYSTACK_SECRET) {
    return { statusCode: 500, body: JSON.stringify({ status: false, message: 'Paystack not configured.' }) };
  }

  const reference = event.queryStringParameters?.reference;
  if (!reference) {
    return { statusCode: 400, body: JSON.stringify({ status: false, message: 'Reference required' }) };
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }
    });
    const result = await response.json();

    if (result.status && result.data.status === 'success' && SUPABASE_URL && SUPABASE_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
      await supabase
        .from('payments')
        .update({
          status: 'success',
          paystack_txn_id: result.data.id.toString(),
        })
        .eq('paystack_reference', reference);
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ status: false, message: err.message }),
    };
  }
};
